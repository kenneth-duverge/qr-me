import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from './ui/separator';

const defaultValues = {
  firstName: '',
  lastName: '',
  social: [{ handle: '' }],
  email: '',
  website: '',
  phoneNumber: '',
  profileName: '',
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
      <Label className="flex flex-col gap-4 w-full mb-0">
        <span className="flex flex-col gap-1">
          <span className="text-base">Profile name</span>
          <span className="text-white/70">A unique name for your profile</span>
        </span>
        <Input
          defaultValue={initialValues.profileName}
          required
          type="text"
          name="profile-name"
          placeholder="Professional"
        />
      </Label>
      <Separator className="my-2 bg-white/50" />
      <div className="flex flex-col md:flex-row gap-6 w-full">
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
          defaultValue={initialValues.social[0].handle ?? ''}
          type="text"
          name="social"
          placeholder="https://twitter.com/jcage"
        />
      </Label>
      <Label className="flex flex-col gap-2">
        Phone Number
        <Input
          type="tel"
          required
          defaultValue={initialValues.phoneNumber}
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
