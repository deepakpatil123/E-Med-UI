import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CustomTextField from "./theme-elements/CustomTextField";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import { numStyle, onKeyDown, Asterisk } from "./StylesnS";
import ReactToPrint from "react-to-print";
import PrintData from "@/utils/printFormat/reimbursementPrint";

function ReimbursementForm(props: any) {
  const status = [
    "Open",
    "Under Processing",
    "Submitted for Approval",
    "Approved",
    "Return",
    "Not Approved",
    "Closed after Approval",
  ];
  const claimedAmount: any = props.info.claim_amount;
  const auth: any = useAuth();

  const date = new Date();

  const [formData, setFormData] = useState<any>({
    inadmissible_amount: "",
    amount_reimbursed: 0,
    amount_in_words: "",
    CGHS_Type: "",
    date_of_submission: "",
    currentremark: "",
    emergency_claim: 0,
    lastForwardedTo: "",
    file_No: "",
    currentStatus: props.info.currentStatus,
  });
  const [printDialogOpen, setPrintDialogOpen] = useState(false);

  const componentRef: any = useRef();

  function test(n: any) {
    if (n < 0) return false;
    const single_digit = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const double_digit = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const below_hundred = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    if (n === 0) return "Zero";

    function translate(n: any) {
      let word = "";
      if (n < 10) {
        word = single_digit[n] + " ";
      } else if (n < 20) {
        word = double_digit[n - 10] + " ";
      } else if (n < 100) {
        const tens = below_hundred[Math.floor(n / 10)];
        const ones = single_digit[n % 10];
        word = tens + " " + ones + " ";
      } else if (n < 1000) {
        word =
          single_digit[Math.floor(n / 100)] + " Hundred " + translate(n % 100);
      } else if (n < 1000000) {
        word =
          translate(Math.floor(n / 1000)).trim() +
          " Thousand " +
          translate(n % 1000);
      } else if (n < 1000000000) {
        word =
          translate(Math.floor(n / 1000000)).trim() +
          " Million " +
          translate(n % 1000000);
      } else {
        word =
          translate(Math.floor(n / 1000000000)).trim() +
          " Billion " +
          translate(n % 1000000000);
      }
      return word;
    }

    let result = translate(n);
    return result.trim() + " Rupees";
  }

  const [remark, setRemark] = useState("");

  const handleSend = async (data: any) => {
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/medical/reimbursement`,
      {
        ...formData,
        claimId: props.info._id,
        diary_No: props.info.diary_No,
        lastForwardedBy: props.lastForwardedBy,
      }
    );
    props.refreshList();
    props.back(false);
  };

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            mb="5px"
          >
            Amount Claimed
          </Typography>
          <Grid>
            <Typography
              fontSize={20}
              paddingX={2}
              variant="subtitle1"
              fontWeight={400}
              component="label"
            >
              {`₹${claimedAmount}/-`}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            mb="5px"
          >
            Inadmissible Amount
          </Typography>
          <Asterisk />
          <Grid>
            <CustomTextField
              value={formData.inadmissible_amount}
              type="number"
              onKeyDown={onKeyDown}
              sx={numStyle}
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  inadmissible_amount: Number(e.target.value),
                  amount_reimbursed: claimedAmount - e.target.value,
                  amount_in_words: test(claimedAmount - e.target.value),
                });
              }}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            mb="5px"
          >
            Amount Reimbursed
          </Typography>
          <Grid>
            <Typography
              fontSize={20}
              paddingX={2}
              variant="subtitle1"
              fontWeight={400}
              component="label"
            >
              {`₹${formData.amount_reimbursed}/-`}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <FormControl>
            <FormLabel
              sx={{ fontWeight: 600 }}
              id="demo-row-radio-buttons-group-label"
            >
              CGHS Type <Asterisk />
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={formData.CGHS_Type}
              onChange={(e: any) =>
                setFormData({ ...formData, CGHS_Type: e.target.value })
              }
            >
              <FormControlLabel
                value={"CGHS"}
                control={<Radio />}
                label="CGHS"
              />
              <FormControlLabel
                value={"Non-CGHS"}
                control={<Radio />}
                label="Non-CGHS"
              />
              <FormControlLabel value={"AMA"} control={<Radio />} label="AMA" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            mb="5px"
          >
            Amount In Words
          </Typography>
          <Grid>
            <Typography
              fontSize={20}
              paddingX={2}
              variant="subtitle1"
              fontWeight={400}
              component="label"
            >
              {formData.amount_in_words}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            mb="5px"
          >
            Emergency Claim (2023/2024)
          </Typography>
          <Asterisk />
          <CustomTextField
            value={formData.emergency_claim}
            type="number"
            onKeyDown={onKeyDown}
            sx={numStyle}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                emergency_claim: e.target.value,
              })
            }
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            mb="5px"
          >
            Date Of Submission
          </Typography>
          <Asterisk />
          <CustomTextField
            value={formData.date_of_submission}
            onChange={(e: any) =>
              setFormData({ ...formData, date_of_submission: e.target.value })
            }
            type="date"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            mb="5px"
          >
            Send To
          </Typography>
          <Asterisk />
          <Select
            size="small"
            fullWidth
            value={formData.lastForwardedTo}
            onChange={(e: any) =>
              setFormData({ ...formData, lastForwardedTo: e.target.value })
            }
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>Select authority</em>
            </MenuItem>
            {props.roles.map((i: any) => (
              <MenuItem key={i} value={i}>{i}</MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            mb="5px"
          >
            File Number
          </Typography>
          <CustomTextField
            //   disabled={props.info.return_By_Secretary}
            value={formData.file_No}
            onChange={(e: any) => {
              setFormData({ ...formData, file_No: e.target.value });
            }}
            type="number"
            onKeyDown={onKeyDown}
            sx={numStyle}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            mb="5px"
          >
            Remark
          </Typography>
          <CustomTextField
            value={formData.currentremark}
            onChange={(e: any) => {
              setFormData({ ...formData, currentremark: e.target.value });
            }}
            type="text"
            onKeyDown={onKeyDown}
            sx={numStyle}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1" fontWeight={600} component="label">
            Status
          </Typography>
          <Select
            displayEmpty
            value={formData.currentStatus}
            onChange={(e: any) => {
              setFormData({ ...formData, currentStatus: e.target.value });
            }}
            input={<OutlinedInput size="small" fullWidth />}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>Select Hospital</em>
            </MenuItem>
            {status.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      <Grid display={"flex"} justifyContent={"space-between"} mt={2}>
        <Button
          title="back"
          variant="contained"
          onClick={() => props.back(false)}
        >
          Back
        </Button>
        <Box>
        <Button
        
            title="preview"
            sx={{ margin: "0 10px" }}
            disabled={
                formData.inadmissible_amount === "" ||
                formData.CGHS_Type === "" ||
                formData.date_of_submission === "" ||
                formData.lastForwardedTo==="" ||
                formData.file_No===""
              }
            variant="outlined"
            onClick={()=>setPrintDialogOpen(true)}
          >
            Preview
          </Button>
          <Button
            title="send"
            disabled={
              formData.inadmissible_amount === "" ||
              formData.CGHS_Type === "" ||
              formData.date_of_submission === "" ||
              formData.lastForwardedTo==="" ||
              formData.file_No===""
            }
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSend}
          >
            Send
          </Button>
        </Box>
        <Dialog
            open={printDialogOpen}
            onClose={()=>setPrintDialogOpen(true)}
            maxWidth="lg"
            fullWidth
          >
            <Box height="100vh">
              <DialogContent>
                <PrintData
                  InadmiAmo={formData.inadmissible_amount}
                  fileNumber={formData.file_No}
                  ref={componentRef}
                  data={props.info}
                  AmountInWord={formData.amount_In_Words}
                  amountReim={formData.amount_reimbursed}
                  remark={formData.currentremark}
                  CGHS_Type= {formData.CGHS_Type}
                />
                <Button
                  title="close"
                  sx={{ position:"absolute", top:0, right:0 }}
                  variant="contained"
                  color="error"
                  onClick={()=>setPrintDialogOpen(false)}
                >
                  X
                </Button>
                <ReactToPrint
                  trigger={() => (
                    <Button title="print" variant="contained">
                      Print
                    </Button>
                  )}
                  content={() => componentRef.current}
                />
              </DialogContent>
            </Box>
          </Dialog>
      </Grid>
    </>
  );
}

export default ReimbursementForm;
