import { Application } from "express";

export default function(app: Application) {
    app.use(
        require('./course/route'),
    )
}