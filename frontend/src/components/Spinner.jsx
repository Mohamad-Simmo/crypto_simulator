import { createPortal } from 'react-dom';

const Spinner = () => {
  const spinner = (
    <div className="backdrop">
      <div className="spinner"></div>
    </div>
  );
  return createPortal(spinner, document.getElementById('backdrop'));
};
export default Spinner;
