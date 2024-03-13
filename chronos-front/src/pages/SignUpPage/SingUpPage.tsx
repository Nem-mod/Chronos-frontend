import {TextField} from "../../components/InputFields/TextField.tsx";
import {createTsForm} from "@ts-react/form";
import {z} from "zod";
import {Link} from "react-router-dom";
import {fetchRegister, fetchVerify} from "../../store/slices/auth.ts";
import {useAppDispatch} from "../../hooks/redux-hooks.ts";
import {webURL} from "../../axios.ts";

const mapping = [[z.string(), TextField]] as const;
const SignUpForm = createTsForm(mapping)

const SignUpSchema = z.object({
    email: z.string().email("Message err").describe("Your email // name@company.com"),
    username: z.string().describe("Your Login // nemdod"),
    password: z.string().min(4, "ERR").describe("Password // *******"),
    repeatPassword: z.string().min(4, "ERR").describe("Confirm password // *******")
})
export const SignUpPage = () => {
    const dispatch = useAppDispatch();
    const handleOnSubmit = async (data: z.infer<typeof SignUpSchema>) => {
        console.log(data)
        dispatch(
            fetchRegister({
                email: data.email,
                username: data.username,
                password: data.password
            })
        )
        dispatch(fetchVerify({
            returnUrl: `${webURL}/verify?token=verifyToken`,
            username: data.username
        }))

    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create your account
                        </h1>
                        <SignUpForm
                            schema={SignUpSchema}
                            onSubmit={handleOnSubmit}
                            props={{
                                password: {
                                    inputType: "password"
                                },
                                repeatPassword: {
                                    inputType: "password"
                                }
                            }}
                        >
                            {({email, password, repeatPassword, username}) => {
                                return (
                                    <div className={"flex flex-col gap-3"}>
                                        {email}
                                        {username}
                                        {password}
                                        {repeatPassword}

                                        <button type="submit"
                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register
                                            new account
                                        </button>

                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Already have an account?
                                            <Link to="/signin"
                                                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Login
                                                here</Link>
                                        </p>
                                    </div>

                                )
                            }}
                        </SignUpForm>
                    </div>
                </div>
            </div>


        </section>

    )
}
