import express from 'express'
import cors from 'cors'
import router from "./routes/auth.js";
import departmentRouter from "./routes/department.js"
import employeementRouter from "./routes/employee.js";
import salaryRouter from "./routes/salary.js"
import leaveRouter from "./routes/leave.js"
import settingsRouter from "./routes/settings.js"
import dashboardRouter from "./routes/dashboard.js"
import connectToDatabase from './db/db.js';

connectToDatabase()

const port = process.env.PORT;

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', router);
app.use(express.static('public/uploads'))
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeementRouter);
app.use("/api/salary", salaryRouter)
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingsRouter);
app.use("/api/dashboard", dashboardRouter);


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})