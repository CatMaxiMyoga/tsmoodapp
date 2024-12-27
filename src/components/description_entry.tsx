import { useEffect, useState } from "react";
import './description_entry.css'

interface Props {
  setDesc: React.Dispatch<React.SetStateAction<string | null>>;
}

const DescriptionEntry = ({ setDesc }: Props) => {
  const [entered, setEntered] = useState<string>('');
  const [active, setActive] = useState<number>(-1);

  const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(0);

    setTimeout(() => setDesc(entered), 200);
  };

  useEffect(() => {
    const timout = setTimeout(() => setActive(1), 10);
    return () => clearTimeout(timout)
  })

  return <div 
    className={`descriptionEntryContainer useFade${
      active === 1 ? " in" : !active ? " out" : ""
    }`}
    style={{ display: "flex", flexDirection: "column" }}
  >
    <div className="descriptionEntryLabelDiv">
      <label className="descriptionEntryLabel">
        What did you do? What happened?
      </label>
    </div>
    <form id="descriptionForm" onSubmit={handleConfirm}></form>
    <textarea
      className="descriptionEntry"
      placeholder="Type here..."
      value={entered}
      onChange={(e) => setEntered(e.target.value)}
      readOnly={!active}
      rows={10}
      cols={40}
      maxLength={5000}
      autoFocus={true}
      wrap="hard"
    />
    <button
      form="descriptionForm"
      type="submit"
      className="descriptionEntryConfirm"
    > Confirm </button>
  </div>
}

export default DescriptionEntry;
