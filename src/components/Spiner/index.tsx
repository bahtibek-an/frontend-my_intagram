import './Spiner.css';
const Spiner: React.FC<{
   color?: string;
}> = ({ color }) => {
   return (
      <svg className="spinner" viewBox="0 0 50 50">
         <circle
            className={`path ${color ? '!stroke-white' : ''}`}
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
         ></circle>
      </svg>
   );
};

export default Spiner;
