import ReactCountdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  // TODO custom render
  return (
    <span>
      {days}:{hours}:{minutes}:{seconds}
    </span>
  );
};

type Props = {
  date: number;
};

const Countdown = ({ date }: Props) => <ReactCountdown date={date} /* renderer={renderer} */ />;

export default Countdown;
