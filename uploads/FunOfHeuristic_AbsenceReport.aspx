<%@ Page Title="" Language="C#" MasterPageFile="~/MainMaste_withmenu.Master" AutoEventWireup="true" CodeBehind="AbsenceReport.aspx.cs" Inherits="WebDesk_ERP.Reports.AbsenceReport" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:UpdatePanel ID="up1" runat="server">
        <ContentTemplate>
            <div class="row">
                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Company:</label>
                    <asp:DropDownList ID="drpCompanyCode" AutoPostBack="true" runat="server" CssClass="form-control ChosenSelector" OnSelectedIndexChanged="drpCompanyCode_SelectedIndexChanged"></asp:DropDownList>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-12">
                    <label>Branch:<span class="required" style="color: red;">*</span></label>
                    <asp:DropDownList ID="drpBranch" runat="server" CssClass="form-control ChosenSelector"></asp:DropDownList>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-12">
                    <label>From Date:<span class="required" style="color: red;">*</span></label>
                    <asp:TextBox ID="txtFromDate" runat="server" CssClass="form-control" placeholder="dd-MMM-yyyy"></asp:TextBox>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-12">
                    <label>To Date:<span class="required" style="color: red;">*</span></label>
                    <asp:TextBox ID="txtToDate" runat="server" CssClass="form-control" placeholder="dd-MMM-yyyy"></asp:TextBox>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-12" style="margin-top: 26px">
                    <asp:Button ID="btnGenerateReport" runat="server" CssClass="btn btn-sm btn-success" Text="Generate Report" OnClick="btnGenerateReport_Click" OnClientClick="return Validate();" />
                </div>
            </div>
            <hr />
            <div class="row">
                <rsweb:ReportViewer ID="ReportViewer1" runat="server" Width="100%" BackColor="White" Visible="true"></rsweb:ReportViewer>
            </div>
            <asp:Label ID="Label1" runat="server" Text=""></asp:Label>
        </ContentTemplate>
    </asp:UpdatePanel>
    <asp:UpdateProgress AssociatedUpdatePanelID="up1" runat="server" DynamicLayout="false" DisplayAfter="0">
        <ProgressTemplate>
            <div class="dialog-background">
                <div class="dialog-loading-wrapper" style="background: none">
                    <span class="dialog-loading-icon">
                        <img src="../images/PT_PROCESSING_FMODE_362.svg" alt="loading.." style="width: 150px;">
                        <br />
                        <p class="progress-bar hidden" style="color: red; font-weight: bolder;">Loading/Processing.....</p>
                    </span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </div>
        </ProgressTemplate>
    </asp:UpdateProgress>
    <script type="text/javascript">
        $(document).ready(function () {
            Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);

            function EndRequestHandler(sender, args) {
                $("#<%= txtFromDate.ClientID%>").datepicker({
                    clearBtn: true, autoclose: true, todayHighlight: true, format: 'dd-M-yyyy'
                });
                $("#<%= txtToDate.ClientID%>").datepicker({
                    clearBtn: true, autoclose: true, todayHighlight: true, format: 'dd-M-yyyy'
                });
            }
        });</script>
    <script type="text/javascript">
        Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function (evt, args) {
            $("#<%= txtFromDate.ClientID%>").datepicker({
                clearBtn: true, autoclose: true, todayHighlight: true, format: 'dd-M-yyyy'
            });
            $("#<%= txtToDate.ClientID%>").datepicker({
                clearBtn: true, autoclose: true, todayHighlight: true, format: 'dd-M-yyyy'
            });
        });

    </script>
    <script type="text/javascript">
        function Validate() {
            var errstr = '';
            var branch = document.getElementById("<%= drpBranch.ClientID %>");
            var fdate = document.getElementById("<%= txtFromDate.ClientID %>");
            var tdate = document.getElementById("<%= txtToDate.ClientID %>");
            if (branch.value == "0") {
                errstr = '1';
                branch.style.borderColor = 'red';
            }
            if (fdate.value == "") {
                errstr = '1';
                fdate.style.borderColor = 'red';
            }
            if (tdate.value == "") {
                errstr = '1';
                tdate.style.borderColor = 'red';
            }
            if (errstr.length > 0) {
                alert('Please fill all the mandetory Fields!');
                return false;
            }
            else {
                return true;
            }
        }
    </script>
</asp:Content>
