import React, { useState, useEffect, useRef } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Modal, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { RootState,AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../redux/slices/todoSlice";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const days = Array.from({ length: 7 }, (_, i) => selectedDate.subtract(3, "day").add(i, "day").format("YYYY-MM-DD"));
  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00 - ${(i + 1).toString().padStart(2, "0")}:00`);

  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();


  const isTimeInSlot = (taskTime: string | undefined, slotTime: string) => {
    if (!taskTime) return false;
    const [slotStart, slotEnd] = slotTime.split(" - ");
    const taskHour = parseInt(taskTime.split(":")[0]);
    return taskHour >= parseInt(slotStart.split(":")[0]) && taskHour < parseInt(slotEnd.split(":")[0]);
  };

  const isSameDay = (taskDate: string | undefined, selectedDay: string) => {
    if (!taskDate) return false;
    return dayjs(taskDate).format("YYYY-MM-DD") === selectedDay;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 300000);
    return () => clearInterval(interval);
  }, []);

      useEffect(() => {
        dispatch(fetchTodos());
      }, [dispatch]);

  

  const isCurrentTime = (time: string) => {
    const currentHour = currentTime.hour();
    const startHour = parseInt(time.split(":")[0]);
    return currentHour === startHour;
  };

  const timeRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  useEffect(() => {
    const currentTimeSlot = timeSlots.findIndex((time) => isCurrentTime(time));
    if (currentTimeSlot !== -1 && timeRefs.current[currentTimeSlot]) {
      timeRefs.current[currentTimeSlot]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentTime, timeSlots]);

  const severityColors: { [key: string]: string } = {
    Low: "#d3ffd3",
    Medium: "#fff5b1",
    High: "#ffb3b3",
    Critical: "#ff6666",
  };

  const handleOpenModal = (task: any) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Select Date" value={selectedDate} onChange={(newDate) => setSelectedDate(newDate || dayjs())} />
      </LocalizationProvider>

        <TableContainer component={Paper} sx={{ marginTop: 2, height: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
                {days.map((day, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    style={{
                      backgroundColor: dayjs(day).isSame(selectedDate, "day") ? "#bbdefb" : "white",
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold", // Make the day headings bold
                    }}
                  >
                    {day}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {timeSlots.map((time, timeIdx) => (
                <TableRow key={timeIdx} ref={(el: any) => (timeRefs.current[timeIdx] = el)}>
                  <TableCell style={{ backgroundColor: isCurrentTime(time) ? "#ffeb3b" : "white", fontWeight: "bold" }}>
                    {time}
                  </TableCell>
                  {days.map((day, dayIdx) => (
                    <TableCell key={dayIdx} align="center" style={{ borderRight: "1px solid #ddd" }}>
                      {todos
                        .filter((task) => !task.completed) // Ensure only incomplete tasks are shown
                        .filter((task) => isTimeInSlot(task.time, time) && isSameDay(task.taskDate, day))
                        .map((task) => (
                          <Box
                            key={task.id}
                            onClick={() => handleOpenModal(task)}
                            sx={{
                              backgroundColor: severityColors[task.severity],
                              padding: "5px",
                              borderRadius: "4px",
                              cursor: "pointer",
                              transition: "0.3s",
                              "&:hover": { backgroundColor: "#e0e0e0" },
                            }}
                          >
                            {task.text}
                          </Box>
                        ))}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "10px",
            p: 4,
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Event Details
          </Typography>
          {selectedTask && (
            <>
              <Typography><strong>Title:</strong> {selectedTask.text}</Typography>
              <Typography><strong>Description:</strong> {selectedTask.description}</Typography>
              <Typography><strong>Date:</strong> {selectedTask.taskDate}</Typography>
              <Typography><strong>Severity:</strong> {selectedTask.severity}</Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Calendar;
