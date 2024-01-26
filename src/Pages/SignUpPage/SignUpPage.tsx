import { FC } from 'react'
import styles from './SignUpPage.module.scss'
import Button from '../../components/Button'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { signUpUserRequest } from '../../requests/user.requests'
import { isAxiosError } from 'axios'
import FormInput from '../../components/FormInput/FormInput'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import Typography from '../../components/Typography'
import { AppRoutes } from '../../routes/appRoutes'

const signUpSchema = z
  .object({
    firstname: z
      .string({ required_error: 'Firstname is required' })
      .min(3, 'Firstname must have at least 3 characters'),
    lastname: z.string({ required_error: 'Lastname is required' }).min(3, 'Lastname must have at least 3 characters'),
    email: z.string({ required_error: 'Email is required' }).email({
      message: 'Must be a valid email',
    }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be atleast 6 characters' }),
    confirmPassword: z.string({ required_error: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  })

type SignUpSchema = z.infer<typeof signUpSchema>

const Login: FC = () => {
  const { control, handleSubmit, setError, reset } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })
  const { mutate } = useMutation({
    mutationFn: (formData: SignUpSchema) => {
      return signUpUserRequest(formData)
    },
  })
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <Typography variant="xl" className={styles.header}>
        Create your pokemon user account!
      </Typography>
      <form
        data-testid="signup"
        className={styles.form}
        onSubmit={handleSubmit((formFields) => {
          mutate(formFields, {
            onSuccess: () => {
              toast('Account created successfully!', { type: 'success' })
              reset()
              navigate(AppRoutes.Login)
            },
            onError: (error) => {
              if (isAxiosError(error)) {
                const e = error.response?.data.error as { message: string; code: number }
                setError('root', e)
                toast(e.message, { type: 'error' })
              }
            },
          })
        })}
      >
        <div className={styles.fields}>
          <FormInput name="email" label="Email" control={control} />
          <FormInput name="firstname" label="First Name" control={control} />
          <FormInput name="lastname" label="Last Name" control={control} />
          <FormInput name="password" label="Password" control={control} type="password" />
          <FormInput name="confirmPassword" label="Confirm Password" control={control} type="password" />
        </div>
        <div className={styles.buttons}>
          <Button variant="primary">Sign up</Button>
          <Link to={AppRoutes.PokemonList}>
            <Button variant="secondary" type="button">
              Continue as Guest
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
