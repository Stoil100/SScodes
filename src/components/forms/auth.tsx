"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Eye, EyeOff, Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AuthSchema } from "../schemas/auth";

type FormVariant = {
    variant: "register" | "login";
};

const AuthForm = ({ variant = "register" }: FormVariant) => {
    const t = useTranslations("Schemes.Auth");
    const formSchema = AuthSchema(variant, t);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            ...(variant === "register" && { confirmPassword: "" }),
        },
    });

    const authUser = async (values: z.infer<typeof formSchema>) => {
        try {
            if (variant === "register") {
                const response = await axios.post("/api/auth/register", {
                    email: values.email,
                    password: values.password,
                    name: values.email.split("@")[0], // Assuming name is part of the email
                });

                if (response.status !== 201) {
                    throw new Error(
                        response.data.message ||
                            "An error occurred during registration"
                    );
                }
                
                const result = await signIn("credentials", {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                });
                return result;
            } else {
                const result = await signIn("credentials", {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                });
                if (result?.error) {
                    throw new Error(result.error);
                }
                return result;
            }
        } catch (error: any) {
            throw new Error(
                error.message || "An error occurred during authentication"
            );
        }
    };

    const authMutatuion = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) => authUser(values),
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setError(null);
        authMutatuion.mutate(values, {
            onSuccess: async () => {
                router.push("/profile");
            },
            onError: (error: any) => {
                setError(error.message);
                setIsLoading(false);
            },
        });
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3 font-openSans rounded-xl text-white">
            <h3 className="z-10 text-center font-playfairDSC text-4xl font-bold capitalize text-[#90e0ef]">
                {variant === "register"
                    ? t("headerRegister")
                    : t("headerLogin")}
            </h3>
            <p className="w-full text-center">{t("usingSocialNetworks")}</p>
            <div className="flex gap-3">
                <Button
                    className="size-[50px] rounded-full bg-[#00b4d8] p-3 transition-all duration-300 hover:scale-110 hover:bg-[#48cae4]"
                    onClick={() => signIn("google", { redirectTo: "/profile" })}
                    disabled={isLoading}
                    type="button"
                >
                    <Icons.google />
                </Button>
                <Button
                    className="size-[50px] rounded-full bg-[#00b4d8] p-0 transition-all duration-300 hover:scale-110 hover:bg-[#48cae4]"
                    onClick={() => signIn("github", { redirectTo: "/profile" })}
                    disabled={isLoading}
                    type="button"
                >
                    <Github />
                </Button>
            </div>
            <div className="flex w-full items-center">
                <div className="w-full border-t-2 border-gray-300" />
                <p className="w-full text-center">{t("orWith")}</p>
                <div className="h-1 w-full border-t-2 border-gray-300" />
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex h-full w-full flex-col justify-between space-y-6 !text-black"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder={t("emailPlaceholder")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex w-full gap-1">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input
                                            type={visible ? "text" : "password"}
                                            placeholder={t(
                                                "passwordPlaceholder"
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setVisible(!visible)}
                            className="text-black"
                        >
                            {visible ? <Eye /> : <EyeOff />}
                        </Button>
                    </div>
                    {variant === "register" && (
                        <>
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type={
                                                    visible
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder={t(
                                                    "confirmPasswordPlaceholder"
                                                )}
                                                {...field}
                                                value={field.value as string}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error && <p>{error}</p>}
                        </>
                    )}

                    <Button
                        className="w-full bg-[#00b4d8] hover:bg-[#48cae4]"
                        type="submit"
                        disabled={isLoading}
                    >
                        {t("submit")}
                    </Button>
                </form>
            </Form>
            <p>
                {variant === "register"
                    ? `${t("alreadyHaveAccount")} `
                    : `${t("doNotHaveAccount")} `}
                <Link
                    href={variant === "register" ? "/login" : "/register"}
                    className="text-[#48cae4] underline"
                >
                    {variant === "register"
                        ? t("loginHere")
                        : t("registerHere")}
                </Link>
            </p>
        </div>
    );
};

export default AuthForm;
