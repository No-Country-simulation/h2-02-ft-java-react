import { FaArrowLeftLong } from 'react-icons/fa6';

export default function ProfileNavbar({ beforePage, titlePage }) {
  return (
    <div>
      <div>
        <FaArrowLeftLong />
        {beforePage}
      </div>
      <div>{titlePage}</div>
    </div>
  );
}
