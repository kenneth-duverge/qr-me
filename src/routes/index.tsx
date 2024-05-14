import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const Index = () => {
  return (
    <div className="text-white font-mono container px-4 md:px-8 h-full w-full flex justify-center items-center">
      <Link to="/profiles">
        <Button variant="secondary">Go to profiles page</Button>
      </Link>
    </div>
  );
};
