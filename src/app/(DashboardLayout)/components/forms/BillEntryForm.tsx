import React, { useRef, useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  FormHelperText,
  Grid,
  Typography,
} from "@mui/material";
import CustomTextField from "./theme-elements/CustomTextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { numStyle, Asterisk, onKeyDown } from "./StylesnS";
import BillEntryFormPrint from "@/utils/printFormat/BillEntryFormPrint";
import BillEntryPrint from "@/utils/printFormat/BillEntryPrint";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import ReactToPrint from "react-to-print";

function BillEntryForm(props: any) {
  const date = new Date();
  // console.log(props.info,"oyoyoy")

  const [formData, setFormData] = useState({
    diary_No: props.info.diary_No,
    bill_No: "",
    bill_date: `${date.getFullYear()}-${
      date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`,
    budget: 1000000,
    expenditure: "",
    remaining_budget: 0,
  });
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const [printFormOpen, setPrintFormOpen] = useState(false);
  const BillEntryRef: any = useRef();

  const handleSend = async (data: any) => {
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/medical/bill_entry`,
      {
        ...formData,
        claimId: props.info._id,
        diary_No: props.info.diary_No,
        lastForwardedBy: props.lastForwardedBy,
        lastForwardedTo: "completed",
        currentStatus: "Closed after Approval",
      }
    );
    props.refreshList();
    props.back(false);
  };

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Bill Number
          </Typography>
          <Asterisk />
          <CustomTextField
            value={formData.bill_No}
            onChange={(e: any) => {
              setFormData({ ...formData, bill_No: e.target.value });
            }}
            variant="outlined"
            type="number"
            onKeyDown={onKeyDown}
            sx={numStyle}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Bill Date
          </Typography>
          <Asterisk />
          <CustomTextField
            value={formData.bill_date}
            onChange={(e: any) =>
              setFormData({ ...formData, bill_date: e.target.value })
            }
            type="date"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Budget
          </Typography>
          <Asterisk />
          <CustomTextField
            value={formData.budget}
            onChange={(e: any) =>
              setFormData({ ...formData, budget: e.target.value })
            }
            type="number"
            onKeyDown={onKeyDown}
            sx={numStyle}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Expenditure
          </Typography>
          <Asterisk />
          <CustomTextField
            value={formData.expenditure}
            onChange={(e: any) => {
              if (e.target.value <= formData.budget)
                setFormData({
                  ...formData,
                  expenditure: e.target.value,
                  remaining_budget: formData.budget - e.target.value,
                });
            }}
            type="number"
            onKeyDown={onKeyDown}
            sx={numStyle}
            variant="outlined"
            fullWidth
          />
          {formData.remaining_budget < 0 && (
            <FormHelperText error>
              {" "}
              Expenditure cannot be greater than budget{" "}
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={4}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Remaining Budget
          </Typography>
          <Grid>
            <Typography
              fontSize={20}
              paddingX={2}
              variant="subtitle1"
              fontWeight={400}
              component="label"
            >
              {formData.remaining_budget}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid display={"flex"} justifyContent={"space-between"} mt={5}>
        <Button
          title="back"
          variant="contained"
          onClick={() => {
            props.back(false);
          }}
        >
          Back
        </Button>
        <Box>
          <Button
            sx={{ margin: "0 10px" }}
            disabled={
              !formData.bill_No ||
              !formData.budget ||
              !formData.expenditure ||
              formData.remaining_budget < 0
            }
            variant="outlined"
            onClick={() => setPrintFormOpen(true)}
          >
            Form
          </Button>
          <Button
            sx={{ margin: "0 10px" }}
            disabled={
              !formData.bill_No ||
              !formData.budget ||
              !formData.expenditure ||
              formData.remaining_budget < 0
            }
            variant="outlined"
            onClick={() => setPrintDialogOpen(true)}
          >
            Preview
          </Button>
          <Button
            disabled={
              !formData.bill_No ||
              !formData.budget ||
              !formData.expenditure ||
              formData.remaining_budget < 0
            }
            title="send"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSend}
          >
            Send
          </Button>
        </Box>
      </Grid>
      <Dialog
        open={printFormOpen}
        onClose={() => setPrintFormOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <Box height="100vh">
          <DialogContent>
            <BillEntryFormPrint info={props.info} formData={formData} />
            <Button
              title="close"
              sx={{ margin: "0 10px" }}
              variant="outlined"
              onClick={() => setPrintFormOpen(false)}
            >
              Close
            </Button>
            <ReactToPrint
              trigger={() => (
                <Button title="print" variant="contained">
                  Print
                </Button>
              )}
              content={() => BillEntryRef.current}
            />
          </DialogContent>
        </Box>
        <Toaster />
      </Dialog>
      <Dialog
        open={printDialogOpen}
        onClose={() => setPrintDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <Box height="100vh">
          <DialogContent>
            <BillEntryPrint info={props.info} formData={formData} />
            <Button
              title="close"
              sx={{ margin: "0 10px" }}
              variant="outlined"
              onClick={() => setPrintDialogOpen(false)}
            >
              Close
            </Button>
            <ReactToPrint
              trigger={() => (
                <Button title="print" variant="contained">
                  Print
                </Button>
              )}
              content={() => BillEntryRef.current}
            />
          </DialogContent>
        </Box>
        <Toaster />
      </Dialog>
    </>
  );
}

export default BillEntryForm;
