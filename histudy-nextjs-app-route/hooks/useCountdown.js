// hooks/useCountdown.js

import { useEffect, useState } from "react";

export const useCountdown = (days = 0) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        if (!days) {
            setTimeLeft("Expired");
            return;
        }

        // 1 day se zyada hai to sirf days show karo
        if (days > 1) {
            setTimeLeft(`${Math.ceil(days)} days left`);
            return;
        }

        const endTime = Date.now() + days * 24 * 60 * 60 * 1000;

        const updateTimer = () => {
            const diff = endTime - Date.now();

            if (diff <= 0) {
                setTimeLeft("Expired");
                return false;
            }

            const totalHours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft(
                `${String(totalHours).padStart(2, "0")}:${String(minutes).padStart(
                    2,
                    "0"
                )}:${String(seconds).padStart(2, "0")}`
            );

            return true;
        };

        updateTimer();

        const timer = setInterval(() => {
            const shouldContinue = updateTimer();

            if (!shouldContinue) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [days]);

    return timeLeft;
};