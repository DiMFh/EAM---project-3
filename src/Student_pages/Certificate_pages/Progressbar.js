import ProgressBar from 'react-bootstrap/ProgressBar';
import './Progressbar.css';

function CustomProgressBar() {
  const now = 60;
  return <ProgressBar className="move-down" now={now} label={`${now}%`} visuallyHidden />;
}

export default CustomProgressBar;