import {
  Button,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, type ChangeEvent } from "react";
import type { Auction } from "../interfaces/auctionInterface";
import { t } from "i18next";

interface Column {
  id: "producto" | "descripcion" | "inicio" | "duracion" | "acciones" ;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
}

interface AuctionsListProps {
  auctions: Auction[];
  updateAuction: (auction: Auction) => void;
  deleteAuction: (auction: Auction) => void;
}

export default function UsersList({ auctions, updateAuction, deleteAuction }: AuctionsListProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const columns: Column[] = [
    {
      id: "producto",
      label: t("auction.product"),
      minWidth: 120,
      align: "left",
    },
    {
      id: "descripcion",
      label: t("auction.description"),
      minWidth: 100,
      align: "left",
    },
    {
      id: "inicio",
      label: t("auction.startTime"),
      minWidth: 100,
      align: "left",
    },
    {
      id: "duracion",
      label: t("auction.duration"),
      minWidth: 100,
      align: "left",
    },
    {
      id: "acciones",
      label: t("auction.actions"),
      minWidth: 100,
      align: "left",
    },
  ];

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "visible", marginTop: 2 }}>
        <TableContainer
          sx={{
            maxHeight: 440,
            width: "100%",
            overflowX: "auto",
            maxWidth: { xs: 450, sm: 550, md: 600, lg: 1000, xl: 1400 },
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {auctions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((auction) => (
                  <TableRow key={auction.id}>
                    <TableCell align="left">{auction.title}</TableCell>
                    <TableCell align="left">{auction.description}</TableCell>
                    <TableCell align="left">{auction.startTime.toLocaleString()}</TableCell>
                    <TableCell align="left">{auction.duration}</TableCell>
                    <TableCell align="left">
                      <Button onClick={() => updateAuction(auction)}>
                        <EditIcon />
                      </Button>
                      <Button
                        color="error"
                        onClick={()=>deleteAuction(auction)}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={auctions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ marginTop: 3 }}
        />
      </Paper>
    </>
  );
}
