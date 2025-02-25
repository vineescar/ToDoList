package main;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;

public class Controll {

    private WebDriver driver;

    @BeforeMethod
    public void setUp() {
        // Set up the ChromeDriver
        System.setProperty("webdriver.chrome.driver", "./drivers/chromedriver");
        driver = new ChromeDriver();
        
        // Maximize window
        driver.manage().window().maximize();
    }

    @Test
    public void testLogin() {
        // Go to the website
        driver.get("https://letcode.in/");

        // Wait for the login button to be clickable and click it
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(By.linkText("Log in")));
        loginButton.click();

        // Enter email and password
        WebElement emailField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("email")));
        emailField.sendKeys("koushik350@gmail.com");
        
        WebElement passwordField = driver.findElement(By.name("password"));
        passwordField.sendKeys("Pass123$");

        // Click the login button
        WebElement submitButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[.='LOGIN']")));
        submitButton.click();

        // Verify successful login by checking for a specific element after login (e.g., a logout button)
        WebElement logoutButton = wait.until(ExpectedConditions.elementToBeClickable(By.linkText("Log out")));
        Assert.assertNotNull(logoutButton, "Logout button should be present, indicating successful login.");
    }

    @AfterMethod
    public void tearDown() {
        // Close the browser after each test
        if (driver != null) {
            driver.quit();
        }
    }
}
