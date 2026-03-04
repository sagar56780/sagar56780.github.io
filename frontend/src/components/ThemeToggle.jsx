import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="btn secondary" onClick={toggleTheme} type="button">
      {theme === 'light' ? 'Dark Theme' : 'Light Theme'}
    </button>
  );
};

export default ThemeToggle;
