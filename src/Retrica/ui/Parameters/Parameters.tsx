import styles from "./parameters.module.css";

const Parameters = ({
  parameters,
  setTimer,
  setFilter,
  setParameters,
}: {
  parameters: string;
  setTimer: (arg0: number) => void;
  setFilter: (arg0: string) => void;
  setParameters: (arg0: string) => void;
}) => {
  const timerOptions = [3, 5, 10];
  const filterOptions = ["sepia", "bw", "smth"];

  switch (parameters) {
    case "filters":
      return (
        <ul className={styles.parameters}>
          <li>Filters</li>
          {filterOptions.map((opt) => (
            <li
              onClick={() => {
                setFilter(opt);
                setParameters("");
              }}
              key={opt}
            >
              {opt}
            </li>
          ))}
        </ul>
      );
      break;
    case "timer":
      return (
        <ul className={styles.parameters}>
          <li>Timer</li>

          {timerOptions.map((opt) => (
            <li
              onClick={() => {
                setTimer(opt + 1);
                setParameters("");
              }}
              key={opt}
            >
              {opt}
            </li>
          ))}
        </ul>
      );
      break;
  }
};

export default Parameters;
