"use client"
import axios from "axios"
import {FcGoogle} from "react-icons/fc"
import {useCallback, useState} from "react"
import {FieldValues, SubmitHandler, useForm} from "react-hook-form"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import {Modal, Heading, Input, Button} from "../index"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })
    const onSubmit: SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true)
        axios.post("/api/register", data)
        .then(()=>{
            registerModal.onClose()
        })
        .catch((error)=>{
            toast.error("Something went wrong try again!")
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    const bodyContent = (
        <div className = "flex flex-col gap-4">
           <Heading
           title = "Welcome to Airbnb"
           subtitle="Create an account!"/>
           <Input 
           id = "email"
           label = "Email"
           disabled = {isLoading}
           register = {register}
           errors = {errors}
           required
           autoComplete = "off"
           />
            <Input 
           id = "name"
           label = "Name"
           disabled = {isLoading}
           register = {register}
           errors = {errors}
           required
           autoComplete = "off"
           />
           <Input 
           id = "password"
           label = "Password"
           disabled = {isLoading}
           register = {register}
           errors = {errors}
           required
           autoComplete = "off"
           />
           <Input 
           id = "confirm password"
           label = "Confirm Password"
           disabled = {isLoading}
           register = {register}
           errors = {errors}
           required
           autoComplete = "off"
           />
        </div>
    )

    const onToggle = useCallback(()=>{
        loginModal.onOpen()
        registerModal.onClose()

    }, [loginModal, registerModal])

    const footerContent = (
        <div className = "flex flex-col gap-4 my-3">
            <hr/>
            <Button
            outline
            label = "Continue with Google"
            icon = {FcGoogle}
            onClick = {()=>signIn("google")}
            />
            <div className = "text-neutral-500 text-center font-light">
               <div className = "justify-center flex flex-row items-center gap-2">
                <div>
                    Already have an account?
                </div>
                <div className = "text-neutral-800 cursor-pointer hover:underline"
                onClick = {onToggle}>
                    Login
                </div>
               </div>
            </div>
        </div>
    )
  return (
    <Modal 
    disabled = {isLoading}
    isOpen = {registerModal.isOpen}
    title = "Register"
    actionLabel="Continue"
    onClose = {registerModal.onClose}
    onSubmit = {handleSubmit(onSubmit)}
    body = {bodyContent}
    footer = {footerContent}
    />
  )
}

export default RegisterModal