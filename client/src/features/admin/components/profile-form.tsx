import { zodResolver } from '@hookform/resolvers/zod';
// import { useFieldArray } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import Input from '@/components/custom/input';
import { useCallback } from 'react';
import { Icons } from '@/components/icons';
import { useAppSelector } from '@/store/configure-store';

const FormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  bio: z.string().max(160).min(4),
  // urls: z
  //   .array(
  //     z.object({
  //       value: z.string().url({ message: 'Please enter a valid URL.' }),
  //     })
  //   )
  //   .optional(),
});

export function ProfileForm() {
  const { user } = useAppSelector((state) => state.account);

  const getInitialValues = useCallback(() => {
    return {
      username: user?.email || '',
      email: user?.email || '',
      bio: 'I own a computer.',
      // urls: [
      //   { value: 'https://shadcn.com' },
      //   { value: 'http://twitter.com/shadcn' },
      // ],
    };
  }, [user]);

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: getInitialValues(),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        fieldName='username'
        label='Username'
        type='text'
        onChange={(e) => setValue('username', e.target.value)}
        defaultValue={getInitialValues().username}
        errors={errors}
      />
      <Input
        fieldName='email'
        label='Email'
        type='email'
        onChange={(e) => setValue('email', e.target.value)}
        defaultValue={getInitialValues().email}
        errors={errors}
      />
      <Input
        fieldName='bio'
        label='Bio'
        type='text'
        onChange={(e) => setValue('bio', e.target.value)}
        defaultValue={getInitialValues().bio}
        errors={errors}
      />
      {/* <div>
        {fields.map((field, index) => (
          <FormField
            control={form.control}
            key={field.id}
            name={`urls.${index}.value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(index !== 0 && 'sr-only')}>
                  URLs
                </FormLabel>
                <FormDescription className={cn(index !== 0 && 'sr-only')}>
                  Add links to your website, blog, or social media profiles.
                </FormDescription>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          type='button'
          variant='outline'
          size='sm'
          className='mt-2'
          onClick={() => append({ value: '' })}
        >
          Add URL
        </Button>
      </div> */}

      <div className='flex justify-end mt-6'>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? (
            <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <Icons.add className='mr-2 h-4 w-4' />
          )}
          Save
        </Button>
      </div>
    </form>
  );
}
