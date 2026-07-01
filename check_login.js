const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
        
        console.log("Navigating to http://localhost:8080");
        await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });
        
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
            console.log("Login button clicked, waiting...");
            await new Promise(r => setTimeout(r, 3000));
            console.log("Current URL after login:", page.url());
        } else {
            console.log("Could not find Login button");
        }
        
        await browser.close();
    } catch (e) {
        console.error("Puppeteer script error:", e);
    }
})();
