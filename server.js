
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
  ep1: {
    video: "https://video-v81.mydramawave.com/vt/334f4117-3869-4754-949f-4cebd2087348/360_0/1_fcc9762c-eab0-4d67-83de-bc7ce5a6a36e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/334f4117-3869-4754-949f-4cebd2087348/tl-PH-098e71a8-5fd4-405a-99cb-c370b0af4fc4/tl-PH-53abe9f3-8524-4807-979b-6a76212d76bb.m3u8"
  },

  ep2: {
    video: "https://video-v81.mydramawave.com/vt/5182ede8-cdb8-45b6-bc97-1a4b5641b6b4/360_0/2_26f4d9a2-a48c-422f-8d67-c3cb73c73959_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/5182ede8-cdb8-45b6-bc97-1a4b5641b6b4/tl-PH-d3b0f80b-1098-401d-8df4-261da545603c/tl-PH-dde7ee2a-8446-4e29-96af-187ad58f362e.m3u8"
  },

  ep3: {
    video: "https://video-v6.mydramawave.com/vt/86023032-3dbb-4ca6-8a0f-b988ebae6255/360_0/3_3b1bed75-981d-438b-87cc-801ee286d838_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/86023032-3dbb-4ca6-8a0f-b988ebae6255/tl-PH-fcd2dab7-73b1-4417-9060-dbfbee528008/tl-PH-22e2f9d5-fec9-4f6e-9b4f-43d3ec0f1570.m3u8"
  },

  ep4: {
    video: "https://video-v81.mydramawave.com/vt/3317e6d0-13d1-4040-8d4d-e8236dd3028c/360_0/4_98166343-2889-4c06-9a20-4f8816645870_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/3317e6d0-13d1-4040-8d4d-e8236dd3028c/tl-PH-812dbc80-03cd-46c8-a4ca-7b72356b62d1/tl-PH-ba72f160-c1d8-4e60-863f-79f673cf28c4.m3u8"
  },

  ep5: {
    video: "https://video-v6.mydramawave.com/vt/a3a18ee5-815d-4bea-9f4c-99b99046d41a/360_0/5_f76d4d98-d213-4ecb-bdc6-48905e0ad121_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/a3a18ee5-815d-4bea-9f4c-99b99046d41a/tl-PH-6b5e1e82-1f4a-4143-a4b6-60e593832569/tl-PH-171932c3-6d67-4a52-8d19-e9840114b73b.m3u8"
  },

  ep6: {
    video: "https://video-v81.mydramawave.com/vt/54ce02a4-5cef-4f90-b1bb-fefcc7e4cd79/360_0/6_de3d875b-a938-48d3-86d9-51c89d2e3665_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/54ce02a4-5cef-4f90-b1bb-fefcc7e4cd79/tl-PH-f2a11e92-d68f-4f59-9ddf-7dc921399261/tl-PH-f556c546-207d-4df4-adda-67a7ed52afae.m3u8"
  },

  ep7: {
    video: "https://video-v81.mydramawave.com/vt/6593f601-1f74-47ae-afe0-bd847af41c6d/360_0/7_41988197-0895-479c-a023-2a3392e0ad41_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/6593f601-1f74-47ae-afe0-bd847af41c6d/tl-PH-9fc98735-e470-4e2b-a32c-553e2f68dc5f/tl-PH-2dfee8f3-967c-49ae-934a-24210c3f8bf7.m3u8"
  },

  ep8: {
    video: "https://video-v6.mydramawave.com/vt/fdb45e8f-b08a-4466-8d01-852336f4caa2/360_0/8_f50f2437-153c-4f6c-8f5b-9e41613b4b13_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/fdb45e8f-b08a-4466-8d01-852336f4caa2/tl-PH-fc705231-35cf-4dce-9d37-76f3a30eb13b/tl-PH-6cc49ac7-de9f-4377-b0b2-4849d1181232.m3u8"
  },

  ep9: {
    video: "https://video-v81.mydramawave.com/vt/c016b117-70fa-4f9b-9460-cf9e758ed666/360_0/9_61c7a639-8830-49bd-80ab-7c7eea04ca5c_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/c016b117-70fa-4f9b-9460-cf9e758ed666/tl-PH-a4a17099-e452-478f-80f8-0e542a489a96/tl-PH-9e05d252-763c-49fd-b3a0-d42e38817091.m3u8"
  },

  ep10: {
    video: "https://video-v6.mydramawave.com/vt/eba57326-bd9f-4d7e-9980-ad8cf848a4c5/360_0/10_db07b5af-0645-45fc-88be-78ff0b36423c_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/eba57326-bd9f-4d7e-9980-ad8cf848a4c5/tl-PH-10247766-6694-47ba-ab73-5a321551d8a9/tl-PH-5743a6a3-3952-44b5-8acc-f67f34dd201f.m3u8"
  },
    ep11: {
    video: "https://video-v6.mydramawave.com/vt/d10cf40f-afa8-4f37-b875-2f71124ba965/360_0/11_b5e752cc-6bb5-4270-918d-bc469fc76596_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/d10cf40f-afa8-4f37-b875-2f71124ba965/tl-PH-79f5d3f4-7625-4811-baa0-7eea405c6289/tl-PH-8ecb6dc2-cf7e-466a-b80d-09a3a9e10caf.m3u8"
  },

  ep12: {
    video: "https://video-v6.mydramawave.com/vt/8b8d2d05-a30e-43c7-b992-4937e1f8ff9d/360_0/12_e1e96185-f68f-4f7d-b8d5-e8a53b24a279_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/8b8d2d05-a30e-43c7-b992-4937e1f8ff9d/tl-PH-b532a39b-93de-4be8-9a95-3b1b6b886206/tl-PH-940c6ca7-2de1-4fc7-9b1c-61d9c98e18b2.m3u8"
  },

  ep13: {
    video: "https://video-v81.mydramawave.com/vt/15e6f0ad-aa00-4dbb-a8c9-997f81d08185/360_0/13_d3614994-2a30-4f93-9a10-1e4d97a5c9e9_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/15e6f0ad-aa00-4dbb-a8c9-997f81d08185/tl-PH-fe4979a1-dcf6-4536-a1a0-1a5584f31979/tl-PH-98fdbc3f-1689-44ba-b183-7637d526d80b.m3u8"
  },

  ep14: {
    video: "https://video-v81.mydramawave.com/vt/ac149734-f9f5-47c5-9dd0-e240ca4424a1/360_0/14_8396d34a-1eea-4274-93f1-9d30da9ff197_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/ac149734-f9f5-47c5-9dd0-e240ca4424a1/tl-PH-02a749af-1ff7-4fb7-a8c2-7ed5730eeba9/tl-PH-2fd397ce-1141-401e-987d-687f1de2b95f.m3u8"
  },

  ep15: {
    video: "https://video-v6.mydramawave.com/vt/e8d73c07-d76c-43dd-b7f0-256aaa7df2c8/360_0/15_50b74232-abd0-4e76-a7d8-2a102cfef85f_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/e8d73c07-d76c-43dd-b7f0-256aaa7df2c8/tl-PH-7bd64fca-c542-4e17-a470-6c3bce34cac0/tl-PH-339ad244-c796-421a-b1fa-8b41118fc9c8.m3u8"
  },

  ep16: {
    video: "https://video-v6.mydramawave.com/vt/7aa2419c-4e55-4504-8d85-1b0735ddaa07/360_0/16_40d72cc2-d57d-4f31-bbac-9ab68764a5b1_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/7aa2419c-4e55-4504-8d85-1b0735ddaa07/tl-PH-796bfbc0-43ac-4c31-a9c3-15e0d9e6096e/tl-PH-49f2dc5b-7870-4921-895f-ae0822dc168c.m3u8"
  },

  ep17: {
    video: "https://video-v6.mydramawave.com/vt/21b1246b-64cf-46bd-9a25-c8270b7af017/360_0/17_df287892-9401-4bef-bc56-7f4e152a371f_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/21b1246b-64cf-46bd-9a25-c8270b7af017/tl-PH-ad91d69e-ae1d-4ef8-a415-1b7eeefb96e0/tl-PH-ee06973d-25db-4b86-9067-8519cfdbf1f4.m3u8"
  },

  ep18: {
    video: "https://video-v6.mydramawave.com/vt/ba00c965-157b-4944-9e02-e64b8afc20c4/360_0/18_8b72914a-8227-460f-86e3-2a7197f4b021_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/ba00c965-157b-4944-9e02-e64b8afc20c4/tl-PH-f1b643d0-386e-40d1-a7d8-6db4f6e111b0/tl-PH-e93cd4de-b652-44f1-b05c-4242f2854d29.m3u8"
  },

  ep19: {
    video: "https://video-v81.mydramawave.com/vt/58f1a2f3-f480-4991-9642-df6f247b952d/360_0/19_309cc7db-b83a-434a-a92c-b9f0403b7913_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/58f1a2f3-f480-4991-9642-df6f247b952d/tl-PH-4e7a10da-4dbd-4d0e-9a4d-f9e4fee2a768/tl-PH-f33f610b-1f14-4d8a-961d-2745c2ec042a.m3u8"
  },

  ep20: {
    video: "https://video-v6.mydramawave.com/vt/a71acf9a-3eda-4480-855e-bf6c1f1f4963/360_0/20_7b61b7fe-af18-4dd4-8d6d-ed6b38f12ea1_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/a71acf9a-3eda-4480-855e-bf6c1f1f4963/tl-PH-c1c690fb-d9dd-4fcc-a564-ba6535c41d54/tl-PH-d289349e-3a8f-4cde-a958-4dc623cab385.m3u8"
  },
ep21: {
    video: "https://video-v6.mydramawave.com/vt/bb908077-0810-4f43-a2c3-3516049ba1ec/360_0/21_b1f5663a-6034-4070-8d66-7e8a7a2c798b_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/bb908077-0810-4f43-a2c3-3516049ba1ec/tl-PH-095303fd-7f5c-448c-a01f-edc908692555/tl-PH-967f0d51-ce06-4dfe-bfe1-6b939538d707.m3u8"
  },

  ep22: {
    video: "https://video-v81.mydramawave.com/vt/24ec5007-8143-4dbe-8c56-df7ea0db811b/360_0/22_dd950b44-10aa-4330-b111-a3a8a358cc6e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/24ec5007-8143-4dbe-8c56-df7ea0db811b/tl-PH-9f481310-1881-415c-81a3-63a40bf1065e/tl-PH-434dbcbe-cab6-4a72-8b25-241fa951a2db.m3u8"
  },

  ep23: {
    video: "https://video-v6.mydramawave.com/vt/96252891-0c7a-4bb1-8eac-45d992b4acd0/360_0/23_565db0ce-0e66-4624-bc5e-9e8e18200ca6_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/96252891-0c7a-4bb1-8eac-45d992b4acd0/tl-PH-aa55627e-df62-4fa2-b2ef-2bc534c7ec63/tl-PH-6de7064e-e82c-4fb1-aa7c-b5ee711db0b0.m3u8"
  },

  ep24: {
    video: "https://video-v6.mydramawave.com/vt/82e18013-5ef5-4f26-81c1-e1cff35cbe40/360_0/24_8a6f0bdd-9c12-427e-8ad9-ae65f222795c_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/82e18013-5ef5-4f26-81c1-e1cff35cbe40/tl-PH-090bccaa-7f1e-44d4-afad-ae161df0af71/tl-PH-e65f26b0-4d70-4ed8-9fe4-bb541f1affc4.m3u8"
  },

  ep25: {
    video: "https://video-v6.mydramawave.com/vt/c20b5313-dd0a-4671-9725-fd99281f7bc5/360_0/25_9972def4-83fd-4c26-937f-b4181c7ce48c_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/c20b5313-dd0a-4671-9725-fd99281f7bc5/tl-PH-8635965a-0447-4786-8ae3-7787fd5c867f/tl-PH-8f560943-9dcb-45ea-933e-6e25c2ff7910.m3u8"
  },

  ep26: {
    video: "https://video-v81.mydramawave.com/vt/e5786d1b-cc62-48cb-bebb-86191fb1493f/360_0/26_240a0956-0645-4112-bb68-881cc258b45c_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/e5786d1b-cc62-48cb-bebb-86191fb1493f/tl-PH-c299a835-6c19-417d-840d-cef15c9c1367/tl-PH-64c161ae-f3a9-4fa8-ab9a-de6d4ef9a935.m3u8"
  },

  ep27: {
    video: "https://video-v6.mydramawave.com/vt/1db18209-126c-47d4-bdc9-2de19247b098/360_0/27_14234a5e-3db7-4989-b28d-d43e247362d4_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/1db18209-126c-47d4-bdc9-2de19247b098/tl-PH-6d12b8e0-c514-481a-89fa-fd2be732aa55/tl-PH-bbb36664-221e-4a41-bdbb-f178181b4f18.m3u8"
  },

  ep28: {
    video: "https://video-v6.mydramawave.com/vt/d40f145f-c116-42af-892a-c6bad6abbc18/360_0/28_0dd000f7-6ee5-455a-9cdc-19b5391b1fb3_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/d40f145f-c116-42af-892a-c6bad6abbc18/tl-PH-50cd4a02-b7ee-4472-8c1f-e17f48514053/tl-PH-be50623f-5aaf-40ba-8c83-02c1f8100eff.m3u8"
  },

  ep29: {
    video: "https://video-v6.mydramawave.com/vt/e11e15c2-fc16-405f-b2cb-540f946abc3f/360_0/29_4a3daaf1-c754-4483-9d61-749cee85a338_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/e11e15c2-fc16-405f-b2cb-540f946abc3f/tl-PH-3c6085f6-fd9b-48c8-ab87-11a6fba8e457/tl-PH-69c95426-415e-4321-83c8-53f846f30853.m3u8"
  },

  ep30: {
    video: "https://video-v6.mydramawave.com/vt/86ba2dff-1e17-4f8c-986b-b09b2b1357bc/360_0/30_bb4ca474-5b08-44c4-95e8-6f1b96082d70_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/86ba2dff-1e17-4f8c-986b-b09b2b1357bc/tl-PH-e7722e23-d32b-4402-9463-0f1d06a05838/tl-PH-3a10f7e9-b943-4de4-9c8c-eecbead2bab4.m3u8"
  },

  ep31: {
    video: "https://video-v6.mydramawave.com/vt/e5f9f160-27bd-4c13-b660-998554062972/360_0/31_24bde475-4573-4fac-be34-fd9a42ef39db_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/e5f9f160-27bd-4c13-b660-998554062972/tl-PH-872bbe7e-f07c-438d-8115-105fa1e9d84c/tl-PH-1924b51a-b25a-4166-b2a4-2ba3942d29c3.m3u8"
  },

  ep32: {
    video: "https://video-v81.mydramawave.com/vt/f00fd7dc-3fd5-4069-a783-8c1502dc6f1e/360_0/32_7f9ff1bd-f976-4943-8cd6-e189099a512a_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/f00fd7dc-3fd5-4069-a783-8c1502dc6f1e/tl-PH-7125415d-4cfd-4bc9-b84b-742b211f1c5e/tl-PH-88d11d2d-765a-42bc-b48f-1224d2554fd4.m3u8"
  },

  ep33: {
    video: "https://video-v6.mydramawave.com/vt/c79b37c2-89a1-4f5d-b3c2-4f6b2eeed547/360_0/33_03bc6940-fc10-4cbe-bf8d-c30262149470_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/c79b37c2-89a1-4f5d-b3c2-4f6b2eeed547/tl-PH-9b7f819d-1320-4d52-933e-ac73711df440/tl-PH-af8bfba8-3071-4065-8ea3-60eafe89a496.m3u8"
  },

  ep34: {
    video: "https://video-v81.mydramawave.com/vt/6868cd20-5dc0-4806-b54e-542062ebf16c/360_0/34_d81989ee-3865-42fe-aa74-3b014ef3112d_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/6868cd20-5dc0-4806-b54e-542062ebf16c/tl-PH-3a6916c5-8460-4d17-91cf-e67b10c1cc73/tl-PH-c806e9c0-4a2f-4811-8c3a-665c4c5e5ac2.m3u8"
  },

  ep35: {
    video: "https://video-v81.mydramawave.com/vt/1bf71e24-60c9-48f8-8aa3-26e7e85de8f7/360_0/35_2a371f4b-5533-42bf-a135-2b779d106285_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/1bf71e24-60c9-48f8-8aa3-26e7e85de8f7/tl-PH-8429cf11-5c9d-4018-88c7-5a74af55eb97/tl-PH-8d6f15ca-e0d6-4c50-8b1b-ff35281dbfca.m3u8"
  },

  ep36: {
    video: "https://video-v81.mydramawave.com/vt/1b0536cd-ea9a-4509-9675-af18acd96270/360_0/36_9add9012-7e4e-4edd-9756-be1722afc025_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/1b0536cd-ea9a-4509-9675-af18acd96270/tl-PH-cb5c4310-621a-4cb4-93c0-23dcc6cf29eb/tl-PH-668e5439-a46a-42c3-b229-e9a184cd7d9e.m3u8"
  },

  ep37: {
    video: "https://video-v81.mydramawave.com/vt/790e80fb-d46a-46ea-ba59-ec7a9249287f/360_0/37_c14c489d-cf58-418f-95d1-6a1fe7d1f051_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/790e80fb-d46a-46ea-ba59-ec7a9249287f/tl-PH-1c48d20e-8e71-4c1f-a29f-24c3fae3f8bb/tl-PH-0270723e-fa2f-4906-8fb4-653791fe8e2a.m3u8"
  },

  ep38: {
    video: "https://video-v81.mydramawave.com/vt/779f2eef-86d2-46da-92c1-2f797a38e645/360_0/38_810591ca-6b21-43b5-b289-dd1efca8d55c_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/779f2eef-86d2-46da-92c1-2f797a38e645/tl-PH-f27fdcec-44b6-4427-815c-30bfb82251ba/tl-PH-d4635c4f-038d-414a-bd76-c5c0bf71decb.m3u8"
  },

  ep39: {
    video: "https://video-v81.mydramawave.com/vt/d6cd9595-d77e-4a27-a72e-f2784ceef370/360_0/39_c8e73a45-c1e3-420c-8a05-235b6c58e96e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/d6cd9595-d77e-4a27-a72e-f2784ceef370/tl-PH-973ddc7c-c9a7-4fd0-bb4c-a059f127dc1b/tl-PH-5967fbbc-3934-4852-8d99-b7f85ed1998a.m3u8"
  },

  ep40: {
    video: "https://video-v81.mydramawave.com/vt/7a0f1ed5-d02a-43f5-b377-d1e57b4fd3ad/360_0/40_bdb1212f-55e2-4cf3-877a-b7d27daadc50_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/7a0f1ed5-d02a-43f5-b377-d1e57b4fd3ad/tl-PH-7be6f2ca-be67-4b6b-8917-9f6a37bcf194/tl-PH-ec1c4dec-08f0-410e-bb8c-957f61541cd2.m3u8"
  },
ep41: {
    video: "https://video-v81.mydramawave.com/vt/e545aad0-cbcb-4c49-95f2-f9e9bd886eb8/360_0/41_0d7ed405-0e15-4c40-9fe5-2fc048dc783d_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/e545aad0-cbcb-4c49-95f2-f9e9bd886eb8/tl-PH-e9449fa6-49ae-4d9f-9176-cb76395e978f/tl-PH-bd48c625-e742-48aa-b63a-0d783363872c.m3u8"
  },

  ep42: {
    video: "https://video-v6.mydramawave.com/vt/aa329438-005c-4991-97d5-384de3bfc420/360_0/42_9ce2069e-cd39-481e-b411-ea0999d3fee5_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/aa329438-005c-4991-97d5-384de3bfc420/tl-PH-d51be283-ce36-4d42-895f-638189511acc/tl-PH-da6070c5-1a51-4866-bb77-1d0892d466dd.m3u8"
  },

  ep43: {
    video: "https://video-v81.mydramawave.com/vt/84b15164-05c0-4600-8fa8-e750864ab816/360_0/43_487403ab-7325-48e7-9fc5-643df92b6073_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/84b15164-05c0-4600-8fa8-e750864ab816/tl-PH-eb2e7206-a382-46a9-a7be-b2f0319611e0/tl-PH-4a9a99ed-1b24-4d15-ac82-8e9b095ae24e.m3u8"
  },

  ep44: {
    video: "https://video-v6.mydramawave.com/vt/101b7ab4-edd9-44e9-9d12-48b108d92b95/360_0/44_58333785-473d-4e3f-a3ad-62437cd461b6_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/101b7ab4-edd9-44e9-9d12-48b108d92b95/tl-PH-ed7c955b-12ff-485a-b4cc-a4c87e29bf4d/tl-PH-233c2e4e-e496-44ec-b61b-8379ef875026.m3u8"
  },

  ep45: {
    video: "https://video-v81.mydramawave.com/vt/071d58b5-8acb-436c-8c01-cb991b840ecb/360_0/45_859886e5-80cb-4b79-a86f-c295bdfd1359_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/071d58b5-8acb-436c-8c01-cb991b840ecb/tl-PH-0ef32ca8-250f-4188-85e4-e9a83515a17f/tl-PH-3b618f74-35de-485c-a6e3-446a31a43f35.m3u8"
  },

  ep46: {
    video: "https://video-v81.mydramawave.com/vt/957ca294-17f5-49ff-bef0-50683df26cdf/360_0/46_24b5458c-b9dc-4ed1-9a77-15908bd5594b_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/957ca294-17f5-49ff-bef0-50683df26cdf/tl-PH-f95e991d-ebca-404d-910a-dacd47c886c5/tl-PH-e3962e1c-e1d4-41ba-9037-9995e6ddbe3d.m3u8"
  },

  ep47: {
    video: "https://video-v6.mydramawave.com/vt/0fdaecb5-4d25-484f-8ee2-1aa226e6f88c/360_0/47_9093da15-6c59-4711-8d71-0784a0248596_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/0fdaecb5-4d25-484f-8ee2-1aa226e6f88c/tl-PH-9bdd1fc8-57ba-4cce-864e-5528dc97c30e/tl-PH-66ccb78f-347f-4621-8e74-308676dd394a.m3u8"
  },

  ep48: {
    video: "https://video-v6.mydramawave.com/vt/f741b509-d7a7-4e92-9d3a-918c4364d6f1/360_0/48_6f3eab01-74fc-4644-9ad9-4adeec1cd8e8_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/f741b509-d7a7-4e92-9d3a-918c4364d6f1/tl-PH-63325066-d758-4176-b18e-f3473e866253/tl-PH-59c1e67e-da3e-481e-a856-8e0e3812e145.m3u8"
  },

  ep49: {
    video: "https://video-v81.mydramawave.com/vt/6bedd0e3-7c49-4538-b375-7b363d530cf4/360_0/49_caa463aa-8192-4d51-bd36-34fa770fc652_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/6bedd0e3-7c49-4538-b375-7b363d530cf4/tl-PH-b34255c0-f912-420f-8579-a2d94d66d18c/tl-PH-4dae27b2-d3b0-44ff-b8ae-5cbb3f0dd886.m3u8"
  },

  ep50: {
    video: "https://video-v6.mydramawave.com/vt/e9523574-2f5d-455d-8594-cd002b1c9142/360_0/50_44c62d7f-9ae8-444c-b933-d84a1f0663e1_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/e9523574-2f5d-455d-8594-cd002b1c9142/tl-PH-bd4861dc-d407-4720-9d98-d01d0c4ec0d3/tl-PH-30392308-3f48-4c08-abb6-33027f82d342.m3u8"
  },

  ep51: {
    video: "https://video-v6.mydramawave.com/vt/4eae8dee-c416-49d5-9fc8-fe8f1b3374c0/360_0/51_d8bb5547-3aa3-49d4-84b1-c10711dcab7d_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/4eae8dee-c416-49d5-9fc8-fe8f1b3374c0/tl-PH-8b38b034-c410-4392-b752-6fb9ab1c76ac/tl-PH-b0523b72-0c5d-4284-b2c1-c6658ebea636.m3u8"
  },

  ep52: {
    video: "https://video-v6.mydramawave.com/vt/d25fea15-2cfc-4905-ba70-d37e52b6f829/360_0/52_548ab8a4-0cf3-4cf0-b697-e0c657bc795b_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/d25fea15-2cfc-4905-ba70-d37e52b6f829/tl-PH-54d49f43-beda-4041-b6dd-249efb484d4b/tl-PH-55b55b38-c0a4-4cdf-8969-13fa8fbcc4a2.m3u8"
  },

  ep53: {
    video: "https://video-v6.mydramawave.com/vt/9a04c005-6b7b-49d3-86c7-0ded50ae5473/360_0/53_9d20691a-746d-4281-bf00-a7d5dc4e4881_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/9a04c005-6b7b-49d3-86c7-0ded50ae5473/tl-PH-c8a3a51c-5a33-424c-a938-07bc6dcd1c22/tl-PH-0c7cd644-138f-4eb4-91a6-5cbec61b486a.m3u8"
  },

  ep54: {
    video: "https://video-v6.mydramawave.com/vt/c4b29225-f879-4867-a017-ae146e083b61/360_0/54_9703c6e0-158b-45be-9129-944dfa8e7ee4_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/c4b29225-f879-4867-a017-ae146e083b61/tl-PH-b969a744-75a4-4b69-8931-f5fcbf6b9a67/tl-PH-de628bda-4029-413c-b562-9b37ec9ca9d5.m3u8"
  },

  ep55: {
    video: "https://video-v81.mydramawave.com/vt/f796e9ad-4185-45e5-9aef-a97ce5582e28/360_0/55_09e7c5ee-2c9b-4a03-9da3-74a6ce7a2cab_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/f796e9ad-4185-45e5-9aef-a97ce5582e28/tl-PH-30de4ec6-0046-4442-9366-6babd7860ec1/tl-PH-643985ba-83b5-4dca-976e-aaba76fa776b.m3u8"
  },

  ep56: {
    video: "https://video-v6.mydramawave.com/vt/3991e966-9201-414b-9016-05e1ef8720d8/360_0/56_9039c5f6-22e5-45c1-b459-7e0b22521706_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/3991e966-9201-414b-9016-05e1ef8720d8/tl-PH-d5ec5a85-6742-45a1-90d6-c2acc8869949/tl-PH-4757ed18-ff15-4b15-aded-388667acd25c.m3u8"
  },

  ep57: {
    video: "https://video-v6.mydramawave.com/vt/260fec88-bea2-4d46-903b-b49f7a1037d0/360_0/57_7bff90b4-39e7-488f-9757-c1894d4ea79d_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/260fec88-bea2-4d46-903b-b49f7a1037d0/tl-PH-c22a14a5-3f58-4d18-865b-8bcd6feb2b60/tl-PH-afbce755-5efa-4e55-83f4-4915d9aeb626.m3u8"
  },

  ep58: {
    video: "https://video-v6.mydramawave.com/vt/edbf5936-ca0c-4007-adf9-8ce8d95a4213/360_0/58_ee22a9d4-9327-4254-b1dd-4ef97b4e89e1_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/edbf5936-ca0c-4007-adf9-8ce8d95a4213/tl-PH-9fc14e85-0d63-4619-8dd4-406e28af2dda/tl-PH-0032183d-cef3-4eed-a056-1c2a607b195e.m3u8"
  },

  ep59: {
    video: "https://video-v6.mydramawave.com/vt/7442febd-eede-48e1-972c-972f774ec464/360_0/59_760d8790-521b-4d05-a89b-604ca2909f7c_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/7442febd-eede-48e1-972c-972f774ec464/tl-PH-b6ca9981-e278-4899-89f1-84d8e3b0ec7f/tl-PH-5782b146-4860-4a5e-9328-1d4bc2ca3792.m3u8"
  },

  ep60: {
    video: "https://video-v81.mydramawave.com/vt/88045b14-b4ba-4fd2-9ddd-98fdcb06a04e/360_0/60_12e76c24-4c31-46af-86f5-ba5d33f6fbc9_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/88045b14-b4ba-4fd2-9ddd-98fdcb06a04e/tl-PH-838b2d16-3890-401e-996f-ab9c98f3981c/tl-PH-f1cdc9c4-0b3c-4280-9876-bcc0f3c61d87.m3u8"
  }
};

// 🔥 Storage
const OUTPUT = path.join(process.cwd(), "streams");
if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT, { recursive: true });

// 🔥 Track running jobs (avoid duplicate ffmpeg)
const running = {};

// 🔥 Generate VOD (ON DEMAND)
function generateVOD(ep) {
  return new Promise((resolve) => {
    if (running[ep]) return resolve("already running");

    const stream = EPISODES[ep];
    if (!stream) return resolve("invalid");

    const dir = path.join(OUTPUT, ep);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const outputFile = path.join(dir, "index.m3u8");

    if (fs.existsSync(outputFile)) {
      return resolve("ready");
    }

    console.log(`🎬 Generating ${ep}...`);
    running[ep] = true;

    const headers =
      "User-Agent: Mozilla/5.0\r\nReferer: https://mydramawave.com/\r\nOrigin: https://mydramawave.com\r\n";

    const args = [
      "-headers", headers,
      "-i", stream.video,

      "-headers", headers,
      "-i", stream.audio,

      "-map", "0:v:0",
      "-map", "1:a:0",

      "-c:v", "copy",
      "-c:a", "aac",

      "-f", "hls",
      "-hls_time", "6",
      "-hls_playlist_type", "vod",
      "-hls_list_size", "0",
      "-hls_flags", "independent_segments",

      outputFile
    ];

    const ffmpeg = spawn("ffmpeg", args);

    ffmpeg.stderr.on("data", (d) => {
      console.log(`[${ep}] ${d}`);
    });

    ffmpeg.on("close", (code) => {
      running[ep] = false;
      if (code === 0) {
        console.log(`✅ ${ep} DONE`);
        resolve("done");
      } else {
        console.log(`❌ ${ep} FAILED`);
        resolve("failed");
      }
    });
  });
}

// 🔥 Serve files
app.use("/vod", express.static(OUTPUT));

// 🔥 ON-DEMAND endpoint (KEY FIX)
app.get("/vod/:ep/index.m3u8", async (req, res) => {
  const ep = req.params.ep;
  const file = path.join(OUTPUT, ep, "index.m3u8");

  if (!fs.existsSync(file)) {
    console.log(`⚡ On-demand generate ${ep}`);
    await generateVOD(ep);
  }

  if (fs.existsSync(file)) {
    return res.sendFile(path.resolve(file));
  } else {
    return res.status(500).send("❌ Failed to generate stream");
  }
});

// 🔥 Playlist
app.get("/playlist.m3u", (req, res) => {
  const base = `${req.protocol}://${req.get("host")}`;
  let m3u = "#EXTM3U\n\n";

  Object.keys(EPISODES).forEach((ep, i) => {
    m3u += `#EXTINF:-1 group-title="🎬 Drama",Episode ${i + 1}\n`;
    m3u += `${base}/vod/${ep}/index.m3u8\n\n`;
  });

  res.setHeader("Content-Type", "application/x-mpegURL");
  res.send(m3u);
});

// 🔥 Debug
app.get("/debug", (req, res) => {
  let status = {};
  Object.keys(EPISODES).forEach(ep => {
    const file = path.join(OUTPUT, ep, "index.m3u8");
    status[ep] = fs.existsSync(file) ? "READY" : "NOT READY";
  });
  res.json(status);
});

// 🔥 Root
app.get("/", (req, res) => {
  res.send("🎬 VOD Server (Render Ready)");
});

// 🔥 Start
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
