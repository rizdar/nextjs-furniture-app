import { TableCell, TableRow } from '@/components/ui/table';

const OrderDetail = ({ order }) => {
  const { created_at, items, total_amount } = order;

  return (
    <TableRow>
      <TableCell>
        <span className="bg-green-500 text-white">{new Date(created_at).toLocaleString()}</span>
      </TableCell>
      <TableCell>
        <ul>
          {Object.values(items).map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </TableCell>
      <TableCell>
        <ul>
          {Object.values(items).map((item) => (
            <li key={item.id}>{item.quantity}</li>
          ))}
        </ul>
      </TableCell>
      <TableCell className="text-right">{total_amount}</TableCell>
    </TableRow>
  );
};

export default OrderDetail;
