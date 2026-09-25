## JAVASCRIPT ASYNCHRONOUS PROGRAMMING - QUESTION XII

---

You've kicked off a server request job and need to check `/api/job-status` every 2 seconds until it reports `"done"` — but give up after 10 attempts. Write `pollUntilDone(maxAttempts)`.

Talk through the design first: `setInterval` fires repeatedly on its own, or you could call `setTimeout` again at the end of each check. Which one do you pick, and why?

**Things to look out for**

- With `setInterval`, what happens if one status check takes longer than the 2-second interval? Do the checks start overlapping?
- Where exactly do you call `clearInterval` — and are you certain it runs on *both* the success path and the gave-up path?
- What should the caller receive when you run out of attempts? A rejection, or a resolved "didn't finish" value? Justify the choice.