// app/profile/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import line from "next-auth/providers/line";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const ProjectsForm = () => {
    const [bValue, setBValue] = useState(false);
    const t = useTranslations("Schemes.Projects");
    const formSchema = z.object({
        title: z.string({ message: t("titleRequired") }),
        description: z.string().optional(),
        image: z.string().url().optional(),
        links: z.array(z.string().url()).optional(),
    });
    const [previewValues, setPreviewValues] =
        useState<z.infer<typeof formSchema>>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            image: "",
            links: [""],
        },
    });
    const onPreview = async (values: z.infer<typeof formSchema>) => {
        setPreviewValues(values);
    };
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            setPreviewValues(undefined);
            form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    return (
        <div className="h-full w-full flex justify-around items-center px-10 flex-wrap space-y-6">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onPreview)}
                    className="flex h-full w-full flex-col justify-between space-y-6 max-w-xl"
                >
                    <h1 className="text-6xl text-white text-center">Values:</h1>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder={t("titlePlaceholder")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Textarea
                                        placeholder={t(
                                            "descriptionPlaceholder"
                                        )}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        placeholder={t("imagePlaceholder")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="links"
                        render={({ field }) => (
                            <>
                                {field.value!.map((_, index) => (
                                    <FormItem key={index}>
                                        <FormLabel className="text-white">
                                            {t("link")} {index + 1}:
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t(
                                                    "linkPlaceholder"
                                                )}
                                                onInput={(event) => {
                                                    field.value![index] = //@ts-ignore
                                                        event.target.value;
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                ))}
                                <Button
                                    className="mt-2 border-2 border-[#0096c7] bg-[#023e8a] w-fit"
                                    onClick={() => {
                                        field.value!.push("");
                                        setBValue(!bValue);
                                    }}
                                    type="button"
                                >
                                    {t("addMoreLinks")}
                                </Button>
                            </>
                        )}
                    />
                    <Button
                        className="w-full"
                        type="submit"
                        // disabled={isLoading}
                    >
                        {t("preview")}
                    </Button>
                </form>
            </Form>
            {previewValues && (
                <section className="space-y-4">
                    <h1 className="text-6xl text-white text-center">
                        Preview:
                    </h1>
                    <div className="text-xl max-w-xl text-white space-y-4">
                        <h1 className="text-4xl text-center">
                            {previewValues.title}
                        </h1>
                        <img src={previewValues.image!} />
                        <p className="text-2xl">{previewValues.description!}</p>
                        <div>
                            <h3>Links:</h3>
                            <ul className="list-disc pl-6">
                                {previewValues.links!.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            href={link}
                                            className="text-blue-400 text-lg"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <Button
                        className="w-full bg-[#00b4d8] hover:bg-[#48cae4]"
                        onClick={() => {
                            onSubmit(previewValues);
                        }}
                    >
                        Upload
                    </Button>
                </section>
            )}
        </div>
    );
};
