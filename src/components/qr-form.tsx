import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const defaultValues = {
  firstName: '',
  lastName: '',
  social: '',
  email: '',
  website: '',
  phoneNumber: '',
};

export const QrForm = ({
  onSubmit,
  initialValues = defaultValues,
}: {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  initialValues?: typeof defaultValues;
}) => {
  return (
    // Should the `form` element be wrapped here?
    <form id="qr-form" onSubmit={onSubmit} className="flex flex-col gap-6 text-white w-full">
      <div className="flex gap-2 w-full">
        <Label className="flex flex-col gap-2 w-full">
          First name
          <Input
            defaultValue={initialValues.firstName}
            required
            type="text"
            name="first-name"
            placeholder="Johnny"
          />
        </Label>
        <Label className="flex w-full flex-col gap-2">
          Last name
          <Input
            defaultValue={initialValues.lastName}
            required
            type="text"
            name="last-name"
            placeholder="Cage"
          />
        </Label>
      </div>
      <Label className="flex flex-col gap-2">
        Email
        <Input
          defaultValue={initialValues.email}
          type="text"
          name="email"
          placeholder="johnny@cage.com"
        />
      </Label>
      <Label className="flex flex-col gap-2">
        Social
        <Input
          defaultValue={initialValues.social}
          type="text"
          name="social"
          placeholder="https://twitter.com/jcage"
        />
      </Label>
      <Label className="flex flex-col gap-2">
        Phone Number
        <Input
          defaultValue={initialValues.phoneNumber}
          type="tel"
          name="phone-number"
          placeholder="123456789"
        />
      </Label>
      <Label className="flex flex-col gap-2">
        Website
        <Input
          defaultValue={initialValues.website}
          type="text"
          name="website"
          placeholder="https://mortalkombat.com"
          className="text-white"
        />
      </Label>
    </form>
  );
};
