import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const QrForm = () => {
  return (
    // Should the `form` element be wrapped here?
    <div className="flex flex-col gap-4 text-white">
      <div className="flex gap-2 w-full">
        <Label className="flex flex-col gap-2 w-full">
          First name
          <Input
            required
            type="text"
            name="first-name"
            placeholder="First name"
            className="text-white"
          />
        </Label>
        <Label className="flex w-full flex-col gap-2">
          Last name
          <Input
            required
            type="text"
            name="last-name"
            placeholder="Last name"
            className="text-white"
          />
        </Label>
      </div>
      <Label className="flex flex-col gap-2">
        Email
        <Input type="text" name="email" placeholder="johnny@cage.com" className="text-white" />
      </Label>
      <Label className="flex flex-col gap-2">
        Social
        <Input
          type="text"
          name="social"
          placeholder="https://twitter.com/kenduve"
          className="text-white"
        />
      </Label>
      <Label className="flex flex-col gap-2">
        Phone Number
        <Input type="tel" name="phone-number" placeholder="123456789" className="text-white" />
      </Label>
      <Label className="flex flex-col gap-2">
        Website
        <Input
          type="text"
          name="website"
          placeholder="https://spacejam.com"
          className="text-white"
        />
      </Label>
    </div>
  );
};
