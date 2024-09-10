import { FC, useEffect } from 'react'
import styles from './UpdateProfilePage.module.scss'
import Button from '../../components/Button'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserRequest } from '../../requests/user.requests'
import { isAxiosError } from 'axios'
import FormInput from '../../components/FormInput/FormInput'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import Typography from '../../components/Typography'
import useUserQuery, { getUserQueryKey } from '../../hooks/useUserQuery'

const profileSchema = z.object({
  firstname: z.string({ required_error: 'Firstname is required' }).min(3, 'Firstname must have at least 3 characters'),
  lastname: z.string({ required_error: 'Lastname is required' }).min(3, 'Lastname must have at least 3 characters'),
  email: z.string({ required_error: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
})

type ProfileSchema = z.infer<typeof profileSchema>

const UpdateProfilePage: FC = () => {
  const queryClient = useQueryClient()
  const { data: userData } = useUserQuery()

  const { control, handleSubmit, setError, reset } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  })

  useEffect(() => {
    if (userData) {
      reset({
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
      })
    }
  }, [userData])

  const { mutate } = useMutation({
    mutationFn: (formData: ProfileSchema) => {
      return updateUserRequest(formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUserQueryKey() })
    },
  })

  return (
    <div className={styles.container}>
      <Typography variant="xl" className={styles.header}>
        Update user account!
      </Typography>
      <form
        data-testid="updateProfile"
        className={styles.form}
        onSubmit={handleSubmit((formFields) => {
          mutate(formFields, {
            onSuccess: () => {
              toast('Profile updated successfully!', { type: 'success' })
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
        </div>
        <div className={styles.buttons}>
          <Button variant="primary">Update profile</Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProfilePage
