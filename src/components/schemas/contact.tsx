"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import emailjs from "@emailjs/browser";

export const ContactForm = () => {
    const t = useTranslations("Schemes.Contact");
    const formSchema = z.object({
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
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            location: "",
            message: "",
        },
    });
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        await emailjs.send(
            process.env.NEXT_PUBLIC_SERVICE_ID!,
            process.env.NEXT_PUBLIC_TEMPLATE_ID!,
            values,
            process.env.NEXT_PUBLIC_KEY_ID!,
        );
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full max-w-md flex-col justify-between h-fit space-y-6 bg-white p-12 text-black shadow-md"
            >
                <h2 className="text-2xl font-semibold uppercase">
                    {t("form_heading")}
                </h2>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder={t("name.placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder={t("email.placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={t(
                                                "location.placeholder"
                                            )}
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Europe">
                                        {t("location.locations.Europe")}
                                    </SelectItem>
                                    <SelectItem value="NA">
                                        {t("location.locations.NA")}
                                    </SelectItem>
                                    <SelectItem value="Asia">
                                        {t("location.locations.Asia")}
                                    </SelectItem>
                                    <SelectItem value="Australia">
                                        {t("location.locations.Australia")}
                                    </SelectItem>
                                    <SelectItem value="Other">
                                        {t("location.locations.Other")}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder={t("message.placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    className="w-full rounded-lg bg-sky-400 bg-gradient-to-r from-sky-400 to-blue-500 py-6 text-lg transition-transform duration-300 hover:scale-110 hover:bg-blue-500"
                    type="submit"
                >
                    {t("submit")}
                </Button>
            </form>
        </Form>
    );
};
