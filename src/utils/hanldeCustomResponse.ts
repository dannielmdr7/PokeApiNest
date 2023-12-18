type StatusResponse = 'success' | 'error';
interface Props {
  status: StatusResponse;
  data?: any;
  msg?: string;
}
export const HandleCustomResponse = ({ status, data, msg }: Props) => {
  switch (status) {
    case 'success':
      return {
        ok: true,
        msg,
        data,
      };
    case 'error':
      return {
        ok: false,
        msg,
        data,
      };
    default:
      break;
  }
};
