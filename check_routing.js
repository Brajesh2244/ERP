const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
        
        console.log("Navigating to http://localhost:8080");
        await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });
        
        console.log("Waiting for username input...");
        await page.waitForSelector('input[type="text"]', { timeout: 10000 });
        
        console.log("Entering credentials");
        await page.type('input[type="text"]', 'admin');
        await page.type('input[type="password"]', 'admin');
        
        console.log("Clicking login");
        const buttons = await page.$$('button');
        let loginButton;
        for (const btn of buttons) {
            const text = await page.evaluate(el => el.textContent, btn);
            if (text.includes('Login')) {
                loginButton = btn;
                break;
            }
        }
        
        if (loginButton) {
            await loginButton.click();
            await page.waitForFunction('window.location.hash.includes("dashboard")', { timeout: 10000 });
            console.log("Current URL after login:", page.url());
            
            console.log("Navigating directly to /#/customers");
            await page.goto('http://localhost:8080/#/customers', { waitUntil: 'networkidle2' });
            await new Promise(r => setTimeout(r, 3000));
            console.log("URL after direct navigation:", page.url());
            
            await page.screenshot({ path: 'customer_screen.png' });
            console.log("Screenshot saved to customer_screen.png");
            
            const body = await page.evaluate(() => document.body.innerHTML);
            if (body.includes('Error') || body.includes('Not Found') || body.includes('Blank')) {
                console.log("Page looks broken");
            }
        }
        
        await browser.close();
    } catch (e) {
        console.error("Puppeteer script error:", e);
    }
})();
