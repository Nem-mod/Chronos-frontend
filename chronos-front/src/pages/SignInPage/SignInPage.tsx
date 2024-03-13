import {TextField} from "../../components/InputFields/TextField.tsx";
import {createTsForm} from "@ts-react/form";
import {z} from "zod";
import {Link} from "react-router-dom";

const mapping = [[z.string(), TextField]] as const;
const SignInForm = createTsForm(mapping);

const SignInSchema = z.object({
    email: z.string().email("Message err").describe("Your email // name@company.com"),
    password: z.string().length(8, "ERR").describe("Password // *******"),
})

export const SignInPage = function ()  {

    const handleOnSubmit = (data: z.infer<typeof SignInSchema>) => {
        console.log(data);
        // TODO: LOGIN REQUEST
    }

    return (
        <section className={
            "bg-gray-50 dark:bg-gray-900"
        }>
            <div className={
                "flex flex-col items-center justify-center " +
                "px-6 py-8 mx-auto md:h-screen lg:py-0"
            }>
                <div className={"w-full bg-white rounded-lg shadow dark:border " +
                    "md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
                }>
                    <div className={"p-6 space-y-4 md:space-y-6 sm:p-8"}>
                        <h1 className={
                            "text-xl font-bold leading-tight tracking-tight " +
                            "text-gray-900 md:text-2xl dark:text-white"
                        }>
                            Sign In
                        </h1>
                        <SignInForm
                            schema={SignInSchema}
                            onSubmit={handleOnSubmit}
                            props={{
                                password: {
                                    inputType: "password"
                                }
                            }}
                        >
                            {({email, password}) => {
                                return (
                                    <div className={"flex flex-col gap-3"}>
                                        {email}
                                        {password}

                                        <button
                                            type={"submit"}
                                            className={
                                                "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none " +
                                                "focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " +
                                                "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            }
                                        >
                                            Sign In
                                        </button>

                                        <p
                                            className={"text-sm font-light text-gray-500 dark:text-gray-400"}
                                        >
                                            Don't have an account?
                                            <Link
                                                to={"/signup"}
                                                className={"font-medium text-primary-600 hover:underline dark:text-primary-500"}
                                            >
                                                Sign up here
                                            </Link>
                                        </p>
                                    </div>
                                )
                            }}
                        </SignInForm>
                    </div>
                </div>
            </div>
        </section>
    );
};
