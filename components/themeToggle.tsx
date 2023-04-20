import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // useEffect only runs on the client, so now we can safely show the UI
  function toggleTheme() {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  return (
    <>
      <div className='flex '> 
        <input id='toggle' type="checkbox" className='hidden peer' onChange={toggleTheme}/>
        <label htmlFor='toggle' className='w-20 h-10 bg-slate-900 cursor-pointer ease-in-out duration-300 rounded-3xl flex flex-row justify-start after:rounded-3xl items-center after:mr-1 after:ml-1 after:w-8 after:h-8 after:bg-slate-200 after:peer-checked:bg-blue-500 peer-checked:justify-end'>  </label>
      </div>
      <Link href='/about' className='hidden md:block text-2xl text-right p-1 pr-2'> Github </Link>
      <Link href='/about' className='hidden md:block text-2xl text-right p-1 pr-2'> About </Link>
    </>
  );
}