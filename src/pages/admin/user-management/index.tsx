import React from 'react';
import { useRegisterForm, RegisterFormValues } from '@/src/hooks/useForm';
import { useAdminRegister } from '@/src/services/hooks/auth/use-admin-register';
import { BaseInput } from '@/src/components/BaseInput';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/src/components/LanguageSwitcher/LanguageSwitcher';

const UserManagement: React.FC = () => {
  const { t } = useTranslation("common");
  const { register, handleSubmit, formState: { errors } } = useRegisterForm();
  const { isLoading, register: adminRegister, error } = useAdminRegister();

  const onSubmit = (data: RegisterFormValues) => {
    adminRegister(data, {
      onSuccess: (response) => {
      },
      onError: (error) => {
        console.error('Registration failed', error);
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <LanguageSwitcher />
      <h1 className="text-3xl font-bold mb-4">{t("userManagement.title")}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <BaseInput
          label={t("userManagement.name")}
          validationState={errors.name ? "invalid" : "none"}
          autoComplete="new-name"
          errorMessage={errors.name?.message}
          {...register("name")}
        />

        <BaseInput
          label={t("userManagement.email")}
          validationState={errors.email ? "invalid" : "none"}
          autoComplete="new-email"
          errorMessage={errors.email?.message}
          {...register("email")}
        />

        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
            {t("userManagement.role")}
          </label>
          <select
            id="role"
            {...register("role")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="mother">{t("userManagement.mother")}</option>
            <option value="nursery">{t("userManagement.nursery")}</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs italic">{errors.role.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          {t("userManagement.submit")}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </div>
  );
};

export default UserManagement;
