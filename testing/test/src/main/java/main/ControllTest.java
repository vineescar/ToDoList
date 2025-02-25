package main;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.interactions.Actions;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import java.util.HashMap;
import java.util.Map;

public class ControllTest {
    private WebDriver driver;

    @BeforeClass
    public void setUp() {

        System.setProperty("webdriver.chrome.driver", "./drivers/chromedriver");
        
        driver = new ChromeDriver();
        
        driver.manage().window().maximize();
        
        driver.get("http://localhost:3000/");
    }

    @Test
    public void assignment() {
        
        Actions builder = new Actions(driver);
        WebElement element;
        
        element = driver.findElement(By.linkText("Add To-Do List"));
        builder.moveToElement(element).perform();
        
        driver.findElement(By.id(":r1:")).click();
        driver.findElement(By.id(":r1:")).sendKeys("Morning Workout");
        driver.findElement(By.id(":r2:")).click();
        driver.findElement(By.id(":r2:")).sendKeys("work hard for six packs");
        driver.findElement(By.id(":r3:")).click();
        driver.findElement(By.id(":r3:")).sendKeys("20:53");
        driver.findElement(By.id(":r4:")).click();
        driver.findElement(By.id(":r4:")).sendKeys("2025-02-26");
        
        element = driver.findElement(By.cssSelector(".MuiButton-root"));
        builder.moveToElement(element).perform();
        driver.findElement(By.cssSelector(".MuiButton-root")).click();
        
        element = driver.findElement(By.tagName("body"));
        builder.moveToElement(element, 0, 0).perform();
        
        driver.findElement(By.id(":r1:")).click();
        driver.findElement(By.id(":r1:")).sendKeys("Read books ");
        driver.findElement(By.id(":r2:")).click();
        driver.findElement(By.id(":r2:")).sendKeys("read atleast 20 pages");
        driver.findElement(By.id(":r3:")).click();
        driver.findElement(By.id(":r3:")).sendKeys("18:55");
        driver.findElement(By.id(":r4:")).click();
        driver.findElement(By.id(":r4:")).sendKeys("2025-02-26");
        
        element = driver.findElement(By.cssSelector(".MuiSelect-select"));
        builder.moveToElement(element).clickAndHold().perform();
        element = driver.findElement(By.cssSelector(".MuiBackdrop-root"));
        builder.moveToElement(element).release().perform();
        driver.findElement(By.cssSelector("body")).click();
        driver.findElement(By.cssSelector(".MuiButtonBase-root:nth-child(3)")).click();
        driver.findElement(By.cssSelector(".MuiButton-root")).click();
        
        element = driver.findElement(By.cssSelector(".MuiPaper-root:nth-child(2) .MuiButtonBase-root:nth-child(1) > .MuiSvgIcon-root"));
        builder.moveToElement(element).perform();
        driver.findElement(By.cssSelector(".MuiPaper-root:nth-child(2) .MuiButtonBase-root:nth-child(1) > .MuiSvgIcon-root")).click();
        driver.findElement(By.cssSelector(".MuiIconButton-colorError > .MuiSvgIcon-root")).click();
        
        element = driver.findElement(By.linkText("Calendar"));
        builder.moveToElement(element).perform();
        
        element = driver.findElement(By.tagName("body"));
        builder.moveToElement(element, 0, 0).perform();
        
        element = driver.findElement(By.cssSelector(".MuiListItem-root:nth-child(2) .MuiTypography-root"));
        builder.moveToElement(element).perform();
        driver.findElement(By.cssSelector(".MuiListItem-root:nth-child(2) .MuiTypography-root")).click();
        
        element = driver.findElement(By.tagName("body"));
        builder.moveToElement(element, 0, 0).perform();
        driver.findElement(By.cssSelector(".MuiListItem-root:nth-child(3) .MuiTypography-root")).click();
        
        element = driver.findElement(By.linkText("Completed Task"));
        builder.moveToElement(element).perform();
        driver.findElement(By.linkText("Completed Task")).click();
        
        element = driver.findElement(By.tagName("body"));
        builder.moveToElement(element, 0, 0).perform();
    }
}
