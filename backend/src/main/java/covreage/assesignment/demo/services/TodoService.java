package covreage.assesignment.demo.services;


import covreage.assesignment.demo.models.Todo;
import covreage.assesignment.demo.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    public Todo createTodo(Todo todo) {
        todo.setDateAdded(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, Todo updatedTodo) {
        return todoRepository.findById(id)
            .map(todo -> {
                todo.setText(updatedTodo.getText());
                todo.setDescription(updatedTodo.getDescription());
                todo.setTime(updatedTodo.getTime());
                todo.setTaskDate(updatedTodo.getTaskDate());
                todo.setSeverity(updatedTodo.getSeverity());
                return todoRepository.save(todo);
            })
            .orElseThrow(() -> new RuntimeException("Todo not found"));
    }

    public void deleteTodoById(Long id) {
        todoRepository.deleteById(id);
    }

    public void toggleTodoStatus(Long id) {
        todoRepository.findById(id).ifPresent(todo -> {
            todo.setCompleted(!todo.isCompleted());
            todoRepository.save(todo);
        });
    }
}
