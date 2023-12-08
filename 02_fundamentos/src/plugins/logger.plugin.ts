import { format, createLogger, transports } from "winston";
const { combine, timestamp, json } = format
export const logger = createLogger({
    level: "info",
    format: combine(
        timestamp(),
        json()
    ),
    transports: [
        new transports.File({ filename: "error.log", level: "error" }),
        new transports.File({ filename: "combined.log" }),
    ]
})
logger.add(new transports.Console({
    format: format.simple(),
}));

export const buildLogger = (service: string) => {
    return {
        log: (message: string) => {
            logger.log("info", { message, service });
        },
        error: (message: string) => {
            logger.error("error", { message, service });
        }
    }
}