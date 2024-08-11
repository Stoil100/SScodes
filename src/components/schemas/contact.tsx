import { z } from "zod";

export const ContactSchema = (t: (arg: string) => string) =>
    z.object({
        name: z
            .string()
            .min(3, t("name.validation"))
            .max(100, t("name.longName")),
        email: z
            .string()
            .email({ message: t("email.validation") })
            .max(100, t("email.longEmail")),
        location: z.string().min(1, t("location.validation")),
        message: z
            .string()
            .min(5, t("message.validation"))
            .max(500, t("message.longMessage")),
    });
