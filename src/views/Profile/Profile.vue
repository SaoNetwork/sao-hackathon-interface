<template>
	<el-scrollbar>
		<div class="profile">
			<div class="profile-userinfo">
				<div class="userinfos">
					<img class="userinfosimg" src="@/assets/images/Upload/uploadback.png" alt="">
					<div class="user-info">
						<div class="user-message">
							<div class="user-avatar">
								<img class="user-head" v-if='userinfo.Avatar' :src="userinfo.Avatar" alt="">
								<img class="user-head" v-else src="@/assets/images/Profile/avatar.png" alt="">
							</div>
							<div class="user-details">
								<span class="nikeName">{{userinfo.Username}}</span>
								<div class="walletinfo">
									<span class="walletnumber">{{userinfo.EthAddr}}</span>
									<div class="copy" @click="copyNumber(userinfo.EthAddr)">
										<img class="copyicon" src="@/assets/images/Profile/Vector.png" alt="">
										<span v-show="!iscopy">Copy</span>
										<span v-show="iscopy">Copied</span>
									</div>
								</div>
								<div class="userfinenumber">
									<div class="finenumber">
										<span class="finenumberdetails">{{userSummary.PublicUploads}}
										</span><span>Files</span>
									</div>
									<div class="finenumber">
										<span class="finenumberdetails">{{userSummary.Collections}}
										</span><span>Collections</span>
									</div>
								</div>
							</div>
						</div>
						<div class="rightBtn">
							<ActiveBtn @onClickBtn="edituserinfo" :btnText='btnText' :btnstyle='btnstyle'></ActiveBtn>
							<MiniHollowBtn class="Disconnectbtn" @MHoBtn='Disconnect' :btnstyle='hollowstyle'>
								<div slot="btncontent" class="deletebtn">
									<span>Disconnect</span>
								</div>
							</MiniHollowBtn>

							<!-- <div class="Disconnect">
							<img src="@/assets/images/Profile/redbtn.png" alt="">
							<span class="Disconnecttext">Disconnect</span>
						</div> -->

						</div>
					</div>
				</div>

			</div>

			<div class="userprofile">

				<div class="tabs">
					<div :class="tabNumber==1?'tabActive singletab':'singletab'" @click="showtabs(1)">
						<span>Home</span>

						<!-- <div  :class="tabNumber==1?'activeBar':''"></div> -->

						<div v-if="tabNumber==1" class="activeBar"></div>


					</div>
					<div :class="tabNumber==2?'tabActive singletab':'singletab'" @click="showtabs(2)">
						<span>Collections</span>

						<div v-if="tabNumber==2" class="activeBar"></div>


						<!-- <div :class="tabNumber==2?'activeBar':''"></div> -->
					</div>
					<div :class="tabNumber==3?'tabActive singletab':'singletab'" @click="showtabs(3)">
						<span>Uploads</span>

						<div v-if="tabNumber==3" class="activeBar"></div>


						<!-- <div :class="tabNumber==3?'activeBar':''"></div> -->
					</div>
					<div :class="tabNumber==4?'tabActive singletab':'singletab'" @click="showtabs(4)">
						<span>Purchases</span>

						<div v-if="tabNumber==4" class="activeBar"></div>


						<!-- <div  :class="tabNumber==4?'activeBar':''"></div> -->
					</div>

				</div>


				<div class="tabNumber1" v-if="tabNumber==1">
					<div class="tabNumberHome">
						<div class="homehead">
							<div>
								<img class="homeheadicon" src="@/assets/images/Profile/data.png" alt="">
								<span>Dashboard</span>
							</div>

						</div>
						<div class="user-information Dashboardinfo">
							<div class="user-infodetails">
								<span class="infostitle">Total Paid </span>
								<span class="infosmain" v-if='userSummary.TotalPaid>=0'>
									{{userSummary.TotalPaid}} ETH
								</span>
								
								<span class="infosmain" v-else>-</span>
							</div>
							<div class="user-infodetails">
								<span class="infostitle">Total Purchased </span>
								<span class="infosmain" v-if='userSummary.PurchasesFiles>=0'>
									{{userSummary.PurchasesFiles}}
								</span>
								
								<span class="infosmain" v-else>-</span>

							</div>
							<div class="user-infodetails">
								<span class="infostitle">Total Earned</span>
								<span class="infosmain" v-if='userSummary.TotalEarned>=0'>
									{{userSummary.TotalEarned}} ETH
								</span>
								
								<span class="infosmain" v-else>-</span>
							</div>
							<div class="user-infodetails">
								<span class="infostitle">Total Sold </span>
								<span class="infosmain" v-if='userSummary.SellFiles>=0'>
									{{userSummary.SellFiles}}
								</span>
								
								<span class="infosmain" v-else>-</span>

							</div>
							<div class="user-infodetails">
								<span class="infostitle">Available Claim </span>
								<span class="infosmain" v-if='userinfo.balance >=0'>
									{{userinfo.balance }} ETH
								</span>
								
								<span class="infosmain" v-else>-</span>
							</div>
							<ActiveBtn v-if="userinfo.balance != '0'" @onClickBtn="claimnow" :btnText='claimbtnText' :btnstyle='btnstyle'></ActiveBtn>
                            <InactiveButton v-else :btnText='claimbtnText' :btnstyle='claimstyle'></InactiveButton>
						</div>
						<div class="homehead">
							<div>
								<img class="homeheadicon" src="@/assets/images/Profile/data.png" alt="">
								<span>Recent Uploads</span>
							</div>
							<div class="viewall" @click="showtabs(3)">
								View All >
							</div>
						</div>
						<div class="homeFileList">

							<FileList v-if='FileMarketList.length>0' :FileList='FileMarketList' @loginwallet='getlogin'>
							</FileList>
							<div class='nofiles' v-else>
								<img class="nofilesicon" src="@/assets/images/Profile/nofiles.png" alt="">
								<span class="nofilestxt">
									No files
								</span>
							</div>
						</div>
						<!-- Recent Downloaded -->
						<div class="homehead" style="padding-top: 8px;">
							<div>
								<img class="homeheadicon" src="@/assets/images/Profile/data.png" alt="">
								<span>Recent Purchases</span>
							</div>
							<div class="viewall" @click="showtabs(4)">
								View All >
							</div>
						</div>
						<div class="homeFileList">
							<FileList v-if='DownloadedList.length>0' :FileList='DownloadedList' @loginwallet='getlogin'>
							</FileList>
							<div class='nofiles' v-else>
								<img class="nofilesicon" src="@/assets/images/Profile/nofiles.png" alt="">
								<span class="nofilestxt">
									No files
								</span>
							</div>
						</div>
					</div>
					<div class="loadingdialog" v-show="userinfoloading">
						<div class="loading-box">

							<div>
								<img class="loadinggif" src="@/assets/images/Common/saoloading.gif" alt="">
							</div>
							<span class="loading-txt">Loading</span>
						</div>
					</div>
				</div>


				<div class="tabNumber1" v-if="tabNumber==2">
					<div class="gap"></div>
					<div class="homeFileList">
						<div class='nofiles'>
							<img class="nofilesicon" src="@/assets/images/Profile/nofiles.png" alt="">
							<span class="nofilestxt">
								No collections
							</span>
						</div>
					</div>
				</div>

				<div class="tabNumber1" v-if="tabNumber==3">
					<div class="gap"></div>
					<div class="homeFileList">
						<FileList v-if='allFileMarketList.length>0' :FileList='allFileMarketList'
							@loginwallet='getlogin'>
						</FileList>
						<div class='nofiles' v-else>
							<img class="nofilesicon" src="@/assets/images/Profile/nofiles.png" alt="">
							<span class="nofilestxt">
								No files
							</span>
						</div>
					</div>
				</div>
				<div class="tabNumber1" v-if="tabNumber==4">
					<div class="gap"></div>
					<div class="homeFileList">
						<FileList v-if='allDownloadedList.length>0' :FileList='allDownloadedList'
							@loginwallet='getlogin'>
						</FileList>
						<div class='nofiles' v-else>
							<img class="nofilesicon" src="@/assets/images/Profile/nofiles.png" alt="">
							<span class="nofilestxt">
								No files
							</span>
						</div>
					</div>
				</div>


			</div>
			<transition name="dialog-fade">
				<EditUser v-if="eiditVisible" :visible.sync="eiditVisible" :userinfo='userinfo'></EditUser>
			</transition>
		</div>
	</el-scrollbar>
</template>

<script>
	import {
		getUserProfile,
		update,
		getUserDashboard,
		getUserSummary,
		getUserPurchases
	} from "../../api/UserApi.js";
	import {
		fileInfos,
		download,
		cancelUpload,
		addFileWithPreview
	} from "../../api/FileApi.js";

	import config from "../../libs/config.js";
	import utils from "../../libs/utils.js";
    import Web3 from 'web3';

	import MiniHollowBtn from "@/components/MiniHollowBtn.vue";
	import ActiveBtn from "@/components/ActiveBtn.vue";
	import InactiveButton from "@/components/InactiveButton.vue";
	import FileList from "@/components/FileList.vue";
	import EditUser from '@/components/EditUser.vue'
	export default {

		data() {
			return {
				iscopy:false,
				eiditVisible: false,
				tabNumber: 1,
				userinfoloading: true,
				Randombtnstyle: {
					width: "105px",
					height: "25px",
					fontSize: "14px"
				},
				hollowstyle: {
					width: "90px",
					height: "25px",
					fontSize: "14px"
				},
				activeName: "one",
				btnText: "Edit",
				claimbtnText: 'Claim',
				btnstyle: 'small',
                claimstyle: {
					width: "107px",
					height: "28px"
                },
				userinfo: {
					Avatar: "",
					nikeName: "",
					walletNum: "",
					fileNumber: "310",
                    balance: 0
				},
				userSummary: {},
				FileMarketList: [

				],
				DownloadedList: [],
				allFileMarketList: [],
				allDownloadedList: []
			};
		},
	mounted() {
		this.$checkConnectedAndNetwork().then(({
			network,
			connected
		}) => {
			if (connected) {
				this.$getWalletAddress().then(address => {
					if (address) {
						let currentSign = utils.getCurrentSign(address);
						if (!currentSign) {
							let signaturemessage = config.signMessage + address;
							this.$sign(signaturemessage, address)
								.then(signature => {
									let sign = {
										address,
										signaturemessage,
										signature
									};
									localStorage.setItem(config.localStorageSignKey, JSON.stringify(sign));
									utils.setSignList(sign);
									this.getUserInfo(address)
									this.getUserDashboard()
									this.getSummary()
									this.getUserPurchases()
								})
								.catch(() => {
									location.reload();
								});
						} else {
							localStorage.setItem(config.localStorageSignKey, JSON.stringify(currentSign));
							this.getUserInfo(address)
							this.getUserDashboard()
							this.getSummary()
							this.getUserPurchases()
						}
					}
				});
			}
			else {
				this.$router.push('/Space');
			}
		})
	},
		components: {
			MiniHollowBtn,
			ActiveBtn,
            InactiveButton,
			FileList,
			EditUser
		},
		methods: {

            claimnow() {
                this.$checkConnectedAndNetwork().then(({ network, connected }) => {
                    this.ChangeRinkebyVisible = !network && network !== undefined;
                    if (network) {
                        this.claim(this.userinfo.EthAddr);
                    } else {
                        this.$message.error('please connect wallet');
                    }
                });
            },
            claim(address) {
                this.$contractClaim(address, res => {
                    console.log(res);
                    if (res === 4) {
                        this.$emit('successbuy', this.profileInfo);
                    }
                    if (res == 'error') {
                        this.$emit('claim failed', this.profileInfo);
                    }
                });
            },
			Disconnect() {
				this.$disconnect();
				this.$router.push('/Space');
				location.reload()
				// location.href = "https://harmonious-treacle-9cadd3.netlify.app";
			},
			getSummary() {
				getUserSummary()
					.then(res => {
						this.userSummary = res.data
					})
					.catch(response => {
						console.log(response);
					})
			},
			edituserinfo() {
				console.log(this.userinfo)
				this.eiditVisible = true
			},
		

			getUserInfo(address) {
				getUserProfile()
					.then(res => {
						console.log(res);
						
                        this.$contractBalances(this.$address).then(result => {
						    this.userinfo = res.data
                            this.userinfo.balance = Web3.utils.fromWei(result+"", 'ether')
                            console.log("userifo", this.userinfo)
                        })
					})
					.catch(response => {
						console.log(response);
					});

			},
			getUserDashboard() {
				getUserDashboard()
					.then(res => {
						if (res.data.RecentUploads != null) {
							let list = res.data.RecentUploads;
							this.allFileMarketList = list
							this.userinfoloading = false
							if (list.length > 4) {
								this.FileMarketList = list.slice(0, 4);
							}
							if (list.length > 0 && list.length < 4) {
								this.FileMarketList = list;
							}
						}else{
							this.userinfoloading = false
							this.allFileMarketList=[]
							this.FileMarketList=[]
						}

					})
					.catch();
			},
			getUserPurchases() {
				getUserPurchases().then(res => {
					if(res.data.Purchases != null){
						let list = res.data.Purchases;
						this.allDownloadedList = list
						this.userinfoloading = false
						if (list.length > 4) {
							this.DownloadedList = list.slice(0, 4);
						}
						if (list.length > 0 && list.length < 4) {
							this.DownloadedList = list;
						}
					}else{
						this.userinfoloading = false
						this.allDownloadedList=[]
						this.DownloadedList=[]
					}
					
				}).catch()
			},
			getlogin() {},
			manageUser() {},
			showtabs(val) {
				this.tabNumber = val;
			},
			copyNumber(item) {
				var cInput = document.createElement("input");
				cInput.value = item;
				document.body.appendChild(cInput);
				cInput.select();
				document.execCommand("copy");
				document.body.removeChild(cInput);
				this.iscopy=true;
				setTimeout(()=>{
					this.iscopy=false;
				},3000);
			}
		}
	};
</script>

<style lang="less" scoped>
	.el-scrollbar {
		height: 100%;
		width: 100%;

		/deep/.el-scrollbar__wrap {
			margin-right: -17px !important;
			overflow: auto;
		}

	}


	.el-scrollbar ::v-deep .el-scrollbar__wrap {
		overflow-y: scroll;
		overflow-x: hidden;
	}

	.profile {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		padding-top: 10px;

		.profile-userinfo {
			height: 160px;
			// max-height: 160px;
			margin: 20px 0;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			padding-bottom: 0;
			box-sizing: border-box;

			.userinfos {
				max-width: 876px;
				max-height: 160px;

				width: 100%;
				height: 100%;
				position: relative;

				.userinfosimg {
					width: 100%;
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
				}

				.user-info {
					width: 100%;
					height: 100%;
					box-sizing: border-box;
					padding: 0 20px;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.user-message {
						width: 80%;
						height: 100%;
						display: flex;
						align-items: center;
					}

					.rightBtn {
						display: flex;
						flex-direction: column;
						align-items: center;
						width: 20%;

						.deletebtn {
							color: #58ffc3;
							display: flex;
							align-items: center;
							justify-content: center;
							height: 28px;

						}

						.Disconnectbtn {
							margin-top: 10px;
						}

						.rightedit {
							position: relative;
							cursor: pointer;


							img {
								width: 130px;
							}

							.editcontent {
								color: #001e13;
								position: absolute;
								top: 42%;
								left: 50%;
								transform: translate(-50%, -50%);
								font-size: 14px;
								font-family: "RobotoMono";
								font-weight: bold;
							}
						}

						.Disconnect {
							display: flex;
							flex-direction: column;
							align-items: center;
							width: 104px;
							position: relative;
							cursor: pointer;
							margin-top: 18px;

							img {
								width: 104px;
							}

							.Disconnecttext {
								color: #FF6868;
								position: absolute;
								top: 42%;
								left: 50%;
								transform: translate(-50%, -50%);
								font-size: 12px;
								font-family: "RobotoMono";
								font-weight: bold;
							}
						}
					}

					.user-avatar {
						position: relative;
						//   width: 100px;
						//   height: 100px;
						width: 130px;
						height: 130px;
						//   top: 50%;
						//   transform: translateY(-50%);
						background: url("../../assets/images/Profile/avatarback.png");
						background-position: center center;
						background-size: cover;
						box-sizing: border-box;
						padding: 20px 0;

						//  margin: 0 10px;
						//   .avatarback{
						//        width: 100px;
						//       height: 100px;
						//       position: absolute;
						//       left: 50%;
						//       top: 50%;
						//       z-index: 1;
						//       transform: translate(-50%,-50%)
						//   }
						.user-head {
							width: 75px;
							height: 75px;
							//   height: 100%;
							//   z-index: 9;
							position: absolute;
							left: 48.5%;
							top: 51%;
							transform: translate(-50%, -50%);
							border-radius: 50%;
							overflow: hidden;
						}
					}

					.user-details {
						width: 80%;
						overflow: hidden;
						position: relative;
						font-size: 14px;

						.nikeName {
							font-size: 20px;
							color: #58ffc3;
							line-height: 1.5em;
						}

						.walletinfo {
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;
							background: rgba(88, 255, 195, 0.2);
							color: #58FFC3;
							line-height: 1.5em;
							margin: 10px 0;
							padding: 0 4px;
							box-sizing: border-box;

							.walletnumber {
								width: 80%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;

							}

							.copy {
								display: flex;
								align-items: center;
								cursor: pointer;
								padding-right: 10px;

								img {
									width: 10px;
									height: 12px;
									padding-right: 3px;
								}
							}
						}

						.userfinenumber {
							height: 15px;
							display: flex;
							align-items: center;
							margin-top: 5px;
							// line-height: 1.2em
						}

						.finenumber {
							padding-right: 20px;
						}

						.finenumberdetails {
							color: #58FFC3
						}

						.finenumber:nth-child(2) {
							border-left: 1px solid #57b196;
							padding-left: 20px;
						}
					}
				}
			}

			.Randombtn {
				display: flex;
				align-items: center;
				font-size: 12px;
				height: 25px;
				color: #58ffc3;
				justify-content: center;

				span {
					padding-right: 5px;
				}

				img {
					width: 15px;
					height: 10px;
					padding-right: 5px;
				}
			}
		}

		.userprofile {
			width: 100%;
			height: 80%;
			// flex: 1;
			// padding: 15px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;

			.tabs {
				// width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				padding-top: 30px;

				// transform: translateX(0px);
				.singletab {
					padding: 0 50px 10px 50px;
					cursor: pointer;
					color: #68b096;
					font-size: 16px;
				}

				.tabActive {
					color: #58ffc3;
					position: relative;
					font-weight: bold;
				}

				.activeBar {
					width: 100%;
					position: absolute;
					bottom: 0;
					left: 0;
					height: 2px;
					background-color: #58ffc3;
					z-index: 1;
					transition: transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
					list-style: none;
				}
			}

			.tabNumber1 {
				position: relative;
				flex: 1;
				width: 100%;
				height: 100%;
				min-height: 500px;
				display: flex;
				align-items: center;
				flex-direction: column;
				box-sizing: border-box;
				background: rgba(0, 0, 0, 0.5);

				// overflow: scroll;
				.gap {
					width: 100%;
					height: 18px;
				}
			}

			.loadingdialog {
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: 99;
				top: 0px;
				left: 0px;
				background-color: rgba(0, 0, 0, 0.7);

				.loading-box {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 180px;
					height: 180px;
					position: absolute;
					left: 50%;
					top: 40%;
					transform: translate(-50%, -50%);
					// background: linear-gradient(45deg, rgba(0, 0, 0, 1), rgba(0, 49, 28, 0.4));
					// border: 1px solid #68B096;
				}

				.loadinggif {
					width: 60px;
					height: 60px;
				}

				.loading-txt {
					font-size: 16px;
					font-weight: bold;
					color: #58FFC3;
					margin-top: 6px;
					font-family: 'RobotoMono'
				}
			}

			.tabNumberHome {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				flex-direction: column;
			}

			.homeFileList {
				width: 100%;
				max-width: 1072px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.homehead {
				width: 100%;
				max-width: 1054px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #58ffc3;
				font-size: 14px;
				padding: 18px 0;

				.homeheadicon {
					width: 27px;
					height: 12px;
					padding-right: 5px;
				}

				.viewall {
					cursor: pointer;
				}
			}

			.nofiles {
				width: 100%;
				max-width: 1054px;
				background: rgba(9, 20, 15, 0.5);
				height: 410px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.nofilesicon {
					height: 66px;
					width: 66px;
				}

				.nofilestxt {
					font-size: 14px;
					color: #243C30;
					padding-top: 10px
				}
			}

			.user-information {
				width: 100%;
				max-width: 1054px;
				height: 100px;
				border: 1px solid #57b196;
				padding: 20px 100px;
				box-sizing: border-box;
				background: linear-gradient(to bottom,
						rgba(11, 36, 24, 1),
						rgba(3, 15, 10, 1));
				display: flex;
				align-items: center;
				justify-content: space-between;

				.user-infodetails {
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 0 10px;

					.infostitle {
						font-size: 12px;
						padding-bottom: 20px;
					}

					.infosmain {
						font-weight: 600;
						font-size: 20px;
						color: #ffffff;
					}
				}
			}

			.Dashboardinfo {
				padding-right: 30px;
			}

			// background: rgba(0, 0, 0, 0.5);
			/deep/.el-tabs__nav-wrap::after {
				//   width: 300px;
				background: none;
			}

			/deep/.el-tabs__header {
				margin: 0;
			}

			//  /deep/.el-tabs{
			//      height: 100%;
			//      overflow: hidden;
			//  }
			/deep/.el-tabs__header .is-top {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #68b096;
			}

			/deep/.el-tabs__item.is-active {
				color: #58ffc3;
			}

			/deep/.el-tabs__active-bar {
				background-color: #58ffc3;
			}

			/deep/.el-tabs__content {
				width: 100%;
				height: 50%;
				background: rgba(0, 0, 0, 0.5);
			}
		}
	}
</style>
