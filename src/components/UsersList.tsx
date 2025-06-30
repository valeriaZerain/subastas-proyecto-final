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
import type { User } from "../interfaces/userInterface";
import { t } from "i18next";

interface Column {
  id: "nombre" | "rol" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
}

interface UsersListProps {
  users: User[];
  updateUser: (user: User) => void;
  deleteUser: (user: User) => void;
}

export default function UsersList({ users, updateUser, deleteUser }: UsersListProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const columns: Column[] = [
    {
      id: "nombre",
      label: t("userManagement.name"),
      minWidth: 120,
      align: "left",
    },
    {
      id: "rol",
      label: t("userManagement.role"),
      minWidth: 100,
      align: "left",
    },
    {
      id: "actions",
      label: t("userManagement.actions"),
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
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="left">{user.name}</TableCell>
                    <TableCell align="left">{user.role}</TableCell>
                    <TableCell align="left">
                      <Button aria-label={t("userManagement.edit")} onClick={() => updateUser(user)}>
                        <EditIcon />
                      </Button>
                      <Button
                        aria-label={t("userManagement.delete")}
                        color="error"
                        onClick={()=>deleteUser(user)}
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
          count={users.length}
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
