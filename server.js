import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep1: {
  video: "https://video-v6.mydramawave.com/vt/08489913-3db8-4803-bb14-d371643d84fd/360_0/1_413226eb-298f-4686-b8c4-21fc856fd902_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/08489913-3db8-4803-bb14-d371643d84fd/tl-PH-764f533f-c739-4e43-a66d-68f1b5bbdf47/tl-PH-71075c27-fc6b-4add-b3d2-dfdd35a70065.m3u8"
},

ep2: {
  video: "https://video-v6.mydramawave.com/vt/597beef8-dee2-4bd2-9471-c6a54e99021e/360_0/2_7adcfa76-7cca-48ee-a653-6fc21ee4ef3a_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/597beef8-dee2-4bd2-9471-c6a54e99021e/tl-PH-39e2fb1f-9d55-46b4-b0f9-538cd648140b/tl-PH-a0da0911-d81c-42ff-995c-b4583bc7f39d.m3u8"
},

ep3: {
  video: "https://video-v6.mydramawave.com/vt/13d6cfa5-4446-4bb4-84c3-435f54152c03/360_0/3_7e426283-bec2-4698-9b09-b54e2bd283a3_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/13d6cfa5-4446-4bb4-84c3-435f54152c03/tl-PH-07689a57-b694-46c5-a322-99df0582b5eb/tl-PH-03e062f3-7617-4584-ad99-256d6d9d2de2.m3u8"
},

ep4: {
  video: "https://video-v6.mydramawave.com/vt/bb5f13b5-b0aa-4903-a3d8-6a6b5cea27a0/360_0/4_85b6cf6c-121f-4338-8b32-14d295ef1676_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/bb5f13b5-b0aa-4903-a3d8-6a6b5cea27a0/tl-PH-5f13b487-d28c-456b-b6c4-5eb6904473c3/tl-PH-10d08109-0d73-4411-93e9-cf5fd931a2fa.m3u8"
},

ep5: {
  video: "https://video-v81.mydramawave.com/vt/4b851c0a-b608-449a-9968-c65512b77da9/360_0/5_f4694713-dfd1-49a6-9ef8-5e22afa42005_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/4b851c0a-b608-449a-9968-c65512b77da9/tl-PH-fbd86675-b0e5-409f-9cf7-70a83c68bbe0/tl-PH-31ba5a7b-4ce6-4f10-9d3a-9688027f0763.m3u8"
},

ep6: {
  video: "https://video-v81.mydramawave.com/vt/dcba04f1-31e0-4681-a54c-2d782385baa3/360_0/6_80476894-8248-4521-8c80-b16638899dd2_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/dcba04f1-31e0-4681-a54c-2d782385baa3/tl-PH-102db356-9344-474b-b30e-392f07346502/tl-PH-851bc19f-b7d6-4355-9ab9-30783dd9c8fe.m3u8"
},

ep7: {
  video: "https://video-v6.mydramawave.com/vt/30f14914-13f6-430b-b5f1-72bb8cde020d/360_0/7_83ef53f6-02c5-419e-bef6-4301545689ed_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/30f14914-13f6-430b-b5f1-72bb8cde020d/tl-PH-0966d3ba-74cd-45cf-ac82-a89d121c6f14/tl-PH-cc66b402-55ae-42d2-801c-9d05c8dbb7f3.m3u8"
},

ep8: {
  video: "https://video-v6.mydramawave.com/vt/0cf1d63c-b603-490e-8585-789048598e10/360_0/8_782003da-0bf7-45f2-a220-7a5c306ae81a_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/0cf1d63c-b603-490e-8585-789048598e10/tl-PH-d4c12593-f781-4500-87c8-e7c97b6a9222/tl-PH-d5970a91-8d89-42bb-b823-8e938a1b650a.m3u8"
},

ep9: {
  video: "https://video-v6.mydramawave.com/vt/b663b8d8-c627-4f0f-a765-04ef93b04439/360_0/9_3b625d47-78fa-4efd-8f72-82a55a658b6b_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/b663b8d8-c627-4f0f-a765-04ef93b04439/tl-PH-1f5e81bf-6bf9-41e6-ae21-ce2a7f52180a/tl-PH-896718e6-3dc6-4b47-ae7b-27f69a15e5ff.m3u8"
},

ep10: {
  video: "https://video-v81.mydramawave.com/vt/bcc130ee-5520-4006-b2cc-cff85c727dee/360_0/10_53fe582c-85ab-4a7c-a23f-93c1876d6489_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/bcc130ee-5520-4006-b2cc-cff85c727dee/tl-PH-accb3b47-cf74-445a-b149-fca7d49fb855/tl-PH-cb1ee898-0848-434d-8ca6-653cafa5d046.m3u8"
},

ep11: {
  video: "https://video-v6.mydramawave.com/vt/cc7b84a6-ff6f-49b6-be8b-63373060f9db/360_0/11_7eb4096c-9cd8-45ef-acd2-95818814dd94_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/cc7b84a6-ff6f-49b6-be8b-63373060f9db/tl-PH-e1bffbf4-8a6f-4fca-8a6f-7e6030b35655/tl-PH-06412f82-54f6-4ee0-bdf7-a7f5cbaee692.m3u8"
},

ep12: {
  video: "https://video-v6.mydramawave.com/vt/95a86374-d8f6-4d03-81e0-f2c12bbec4fd/360_0/12_133d2ae4-1dd7-4510-a10e-fca52d5b8439_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/95a86374-d8f6-4d03-81e0-f2c12bbec4fd/tl-PH-29345893-d8cd-4fb2-97ce-2ec2bceef4e8/tl-PH-6b85e6dc-9ff6-4cc3-8863-7a5cbb6c977e.m3u8"
},
  ep13: {
  video: "https://video-v81.mydramawave.com/vt/887f35b8-632a-4a58-b13f-db987b31ad68/360_0/13_d6ac2eaf-562d-4b23-b11d-76299151ecdf_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/887f35b8-632a-4a58-b13f-db987b31ad68/tl-PH-7f15838c-c76f-492b-bea7-f1547b0ec5ea/tl-PH-d078f900-d320-419e-9702-d5165ada9fee.m3u8"
},

ep14: {
  video: "https://video-v81.mydramawave.com/vt/871d59cb-204e-4ac8-9eee-f3207b79394a/360_0/14_aea67f5e-edd9-4f97-bf2c-8556fa174fc0_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/871d59cb-204e-4ac8-9eee-f3207b79394a/tl-PH-45be8442-165f-4751-9717-514da3d7383f/tl-PH-78d4d10b-e0bd-443b-80f2-b6dc6e83e040.m3u8"
},

ep15: {
  video: "https://video-v6.mydramawave.com/vt/409998c9-8b4e-4a64-acd0-a486c12e9c47/360_0/15_ec3d84d7-27ab-4f25-b939-9a620dd72e11_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/409998c9-8b4e-4a64-acd0-a486c12e9c47/tl-PH-a7899276-bdef-4c9c-8b58-b0725a6bc0b7/tl-PH-68f22e08-701f-43b8-9852-88aab8f4a8a9.m3u8"
},

ep16: {
  video: "https://video-v81.mydramawave.com/vt/89edf3e9-8f55-45fe-a35c-e424f8853fc1/360_0/16_93ec7f7f-d66c-46e3-9b25-77c93f4d2547_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/89edf3e9-8f55-45fe-a35c-e424f8853fc1/tl-PH-95017728-6fa6-43e8-a066-f1f09a2854b8/tl-PH-968b704a-247d-4ed9-a56a-62ca76c5d079.m3u8"
},

ep17: {
  video: "https://video-v6.mydramawave.com/vt/daee6ba7-52a4-4223-ac83-d24235684b87/360_0/17_ab4f2802-1a0c-4458-abdd-8263486cc513_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/daee6ba7-52a4-4223-ac83-d24235684b87/tl-PH-f2fbb54b-8116-490b-bf73-94347829095d/tl-PH-6cf406e3-8362-4edd-9b7e-89c20bcac549.m3u8"
},

ep18: {
  video: "https://video-v6.mydramawave.com/vt/30f87b2d-0603-42d1-a87a-da49cbd4b51f/360_0/18_a6c038c3-7475-47d0-aa54-4527e349b4f9_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/30f87b2d-0603-42d1-a87a-da49cbd4b51f/tl-PH-fd0ad847-6c3c-4133-8def-196e486d16a8/tl-PH-ac183a6d-d951-4ba9-bafd-8cbe371a4f27.m3u8"
},

ep19: {
  video: "https://video-v6.mydramawave.com/vt/6ecbb02a-d5e9-42ed-b1b6-fb69add5de07/360_0/19_1b73d7cc-8459-4b7a-ada0-776526121241_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/6ecbb02a-d5e9-42ed-b1b6-fb69add5de07/tl-PH-b9950cb3-4409-492f-ae59-9cecceac35b8/tl-PH-3b65ec70-eaaf-41e3-a191-761d782ce46e.m3u8"
},

ep20: {
  video: "https://video-v81.mydramawave.com/vt/be20352a-1084-4929-915f-75b8e170d367/360_0/20_eb64d09d-4d3a-4978-ad39-b5ab55f07692_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/be20352a-1084-4929-915f-75b8e170d367/tl-PH-dd35702e-8e72-4f02-b6b0-1a11f14a290d/tl-PH-49385729-be52-432e-b754-9bff03ca9135.m3u8"
},
  ep21: {
  video: "https://video-v6.mydramawave.com/vt/61962cdc-003f-44d2-9475-45f759436511/360_0/21_be380710-f07f-4f98-b967-2cb4c927e6d9_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/61962cdc-003f-44d2-9475-45f759436511/tl-PH-d9087068-622f-4a68-b60d-8f45c94ea885/tl-PH-5c9e479a-048e-41b5-a025-77adda797c86.m3u8"
},

ep22: {
  video: "https://video-v81.mydramawave.com/vt/734198e0-1d78-4ff5-8054-bed7bba4468e/360_0/22_afed007d-cc4e-4d05-ac4e-535180a8182e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/734198e0-1d78-4ff5-8054-bed7bba4468e/tl-PH-9f5cdd86-f5c9-457a-9877-a03f26de1d7d/tl-PH-ae11b730-0010-4446-9440-2d35f7b709b0.m3u8"
},

ep23: {
  video: "https://video-v81.mydramawave.com/vt/1bd80907-ecc2-4ad7-8031-5d9fa95e1aa4/360_0/23_84c775ac-94dc-448f-acb9-2c8b813163e7_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/1bd80907-ecc2-4ad7-8031-5d9fa95e1aa4/tl-PH-bf4ae6a5-1301-49d8-b448-4d556eae2d21/tl-PH-4b1cb8c1-8faa-4ce2-bff6-d52131d63729.m3u8"
},

ep24: {
  video: "https://video-v6.mydramawave.com/vt/d5fa83e3-0e49-4d34-88f3-acde646adfac/360_0/24_f3e36e40-9e9f-4cba-846b-ed3ccf17a75d_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/d5fa83e3-0e49-4d34-88f3-acde646adfac/tl-PH-e62f3cf2-0f29-40f5-a596-d8da7c8ad4c6/tl-PH-1ae05a5a-8469-48ee-bb01-a6f20eb7db62.m3u8"
},

ep25: {
  video: "https://video-v6.mydramawave.com/vt/9c101cfe-6158-4fcb-b10d-20d396c2996c/360_0/25_563a57e7-cc87-46fc-9a81-649074a28d60_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/9c101cfe-6158-4fcb-b10d-20d396c2996c/tl-PH-934120fb-00d1-4ffb-abcb-227f6efad36e/tl-PH-cd250a94-33a5-4aee-b668-9283d55a9117.m3u8"
},

ep26: {
  video: "https://video-v81.mydramawave.com/vt/f4dd42d2-9d20-4b4b-80c1-bd5d28b0873d/360_0/26_6e1d24e7-e0ce-4080-a620-fe3c95627882_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/f4dd42d2-9d20-4b4b-80c1-bd5d28b0873d/tl-PH-27078bd0-e56e-41da-8b87-cb6ccc301085/tl-PH-2113fef2-5275-4854-8991-0b75afa293df.m3u8"
},

ep27: {
  video: "https://video-v6.mydramawave.com/vt/11b1fce9-3142-4f7f-9724-971848fc3c72/360_0/27_1950f966-5132-49e8-85a1-b9948122c420_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/11b1fce9-3142-4f7f-9724-971848fc3c72/tl-PH-62cabb32-0843-4db9-8abd-0cf6df556771/tl-PH-dd2dcf23-808e-496a-9f15-98bab45b54ab.m3u8"
},

ep28: {
  video: "https://video-v81.mydramawave.com/vt/5f253097-1ad9-4de8-8b28-5c3385e906dd/360_0/28_ad640446-3d7a-4a89-9aaf-6902035ba855_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/5f253097-1ad9-4de8-8b28-5c3385e906dd/tl-PH-15097626-ddd0-4d42-bdc6-bbfdd2748685/tl-PH-d1281c72-ebbc-4127-8741-b9bf38231663.m3u8"
},

ep29: {
  video: "https://video-v81.mydramawave.com/vt/6ca2350f-3ed6-403b-8cad-943d068a4cb8/360_0/29_212aaa9b-2b28-47f4-b376-4ae93d2cf05b_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/6ca2350f-3ed6-403b-8cad-943d068a4cb8/tl-PH-13162772-97ef-4824-be96-72a4535ee1a2/tl-PH-b78c18d7-81c6-4001-8a30-92dff5394e83.m3u8"
},

ep30: {
  video: "https://video-v6.mydramawave.com/vt/52f2d270-7834-4848-8da5-f83b2d2ce86d/360_0/30_c1859f7b-dfbb-403f-bc52-8b37145262fa_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/52f2d270-7834-4848-8da5-f83b2d2ce86d/tl-PH-acbda437-6285-42e2-871f-b0605d149c9a/tl-PH-dd5ea1f5-3d7a-492b-84e2-b992a2dcb321.m3u8"
},
  ep31: {
  video: "https://video-v6.mydramawave.com/vt/b8337aba-3a0f-42d4-9f28-6bbb65f02196/360_0/31_9afa00f9-3266-4b43-b2e0-75fffc172d62_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/b8337aba-3a0f-42d4-9f28-6bbb65f02196/tl-PH-2952f384-a5e6-452e-a922-31c4b8ff7cc1/tl-PH-328ef761-5483-4c9c-a601-39d2e8e40097.m3u8"
},

ep32: {
  video: "https://video-v81.mydramawave.com/vt/0ba889d1-fb92-4ffa-aea0-0e6ed335c75f/360_0/32_0dd236f9-dd71-42d0-baac-ac48ce9adca2_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/0ba889d1-fb92-4ffa-aea0-0e6ed335c75f/tl-PH-a52baed5-cf21-4c81-9f4a-5cef2757c7c9/tl-PH-34250d13-5643-431f-91c1-fe50ddf10b86.m3u8"
},

ep33: {
  video: "https://video-v6.mydramawave.com/vt/c5d8fce4-783b-43af-9c62-4aa481ccbbcf/360_0/33_9057719c-4f41-4336-a0d0-91cc09f61753_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/c5d8fce4-783b-43af-9c62-4aa481ccbbcf/tl-PH-442b6d68-c65f-40cc-a7ff-907b7d30e7ab/tl-PH-d8be21d4-4537-4cdb-a6b6-b6c055dc0a3a.m3u8"
},

ep34: {
  video: "https://video-v6.mydramawave.com/vt/631524a3-0063-4cbc-a39e-a3368a79d531/360_0/34_fc21af3f-750a-4fb6-bd5c-92b2e5972448_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/631524a3-0063-4cbc-a39e-a3368a79d531/tl-PH-d72032aa-5d39-4b4d-b9b4-577d183bf733/tl-PH-157bd9e7-6992-4227-bae7-18451a88a682.m3u8"
},

ep35: {
  video: "https://video-v81.mydramawave.com/vt/f2b666a0-1ec5-4d1a-8d17-c20b70354b6c/360_0/35_aeeed605-f518-4a3c-89c1-0b3419063eec_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/f2b666a0-1ec5-4d1a-8d17-c20b70354b6c/tl-PH-b354504c-1d1d-4c9d-a3d8-303cac1b15e4/tl-PH-14989e7c-10fb-49e9-8206-e5f2f425fb31.m3u8"
},

ep36: {
  video: "https://video-v81.mydramawave.com/vt/a3e51603-e563-44ef-8b9c-dfb9a705e993/360_0/36_75bbf2fe-7307-435d-a873-731c01d7b342_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a3e51603-e563-44ef-8b9c-dfb9a705e993/tl-PH-2aae06a3-5d49-4b1b-9606-163a773ed079/tl-PH-cd2f4f34-7027-4f32-8bcf-99613bddaefe.m3u8"
},

ep37: {
  video: "https://video-v81.mydramawave.com/vt/32d8d5c9-306f-41f4-bff7-5f21d0365e1f/360_0/37_d3a98218-0dbd-4d09-a1de-ef443be7ab0b_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/32d8d5c9-306f-41f4-bff7-5f21d0365e1f/tl-PH-73427d71-944c-433d-a82b-920aba74a8be/tl-PH-71075524-1b41-4072-b1ed-e8301d9c6537.m3u8"
},

ep38: {
  video: "https://video-v81.mydramawave.com/vt/1e703bbe-8f84-44c6-8217-292e2283ca88/360_0/38_9f7dcd21-890a-431f-b339-4445bce9d7c4_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/1e703bbe-8f84-44c6-8217-292e2283ca88/tl-PH-6d5d5830-b192-4590-b341-06ecc784bcdc/tl-PH-bea6230a-94f4-4106-9d52-dae6a71ee62c.m3u8"
},

ep39: {
  video: "https://video-v6.mydramawave.com/vt/beadf2bf-a808-47b5-b903-ec381cd81151/360_0/39_6a0c787e-4ed0-4cab-b7f0-7fe2a4898f0e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/beadf2bf-a808-47b5-b903-ec381cd81151/tl-PH-ca5aee60-f8c2-47cc-9b5a-05087f4f2469/tl-PH-143c9e54-9be6-44bd-83df-7f9fbc43620b.m3u8"
},

ep40: {
  video: "https://video-v81.mydramawave.com/vt/e524fb01-40c9-4aec-83be-2a9fe9095d3a/360_0/40_0c0fd6f7-b57a-4187-bea2-9bc0e2d5b089_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/e524fb01-40c9-4aec-83be-2a9fe9095d3a/tl-PH-2881fa52-fadc-416a-9cbd-cfcc809f0946/tl-PH-1c485f9b-b3c2-42a8-a1bb-25df21049a1a.m3u8"
},
  ep41: {
  video: "https://video-v6.mydramawave.com/vt/8b0b9d4a-3173-47f7-a814-17ddd4039a82/360_0/41_c445327a-1786-4b66-957b-b2611fd40d68_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/8b0b9d4a-3173-47f7-a814-17ddd4039a82/tl-PH-4cb95a51-ab34-45b4-afb5-22863e63717e/tl-PH-d4b0d97c-385a-435c-9102-58997dcabfc9.m3u8"
},

ep42: {
  video: "https://video-v81.mydramawave.com/vt/b5cf58f2-cd3d-4abe-a908-e34f2c6ffe6c/360_0/42_83156a6b-eb31-44a1-bca8-595b42254211_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/b5cf58f2-cd3d-4abe-a908-e34f2c6ffe6c/tl-PH-ff391ef4-0b11-4282-92ae-19fdd6b122f9/tl-PH-afd8a176-e099-4e76-bb35-83ee73d80806.m3u8"
},

ep43: {
  video: "https://video-v6.mydramawave.com/vt/f8f00641-8ca0-4bfc-85a3-99e4bbd767e0/360_0/43_72615824-0da4-4631-b49b-c0018ab29067_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/f8f00641-8ca0-4bfc-85a3-99e4bbd767e0/tl-PH-eae1beac-6474-4086-8578-0aaf220c4d8d/tl-PH-f6320498-3d8c-41e9-bf36-4536e2c600a5.m3u8"
},

ep44: {
  video: "https://video-v6.mydramawave.com/vt/9af7929c-6038-4dda-bb9b-1e34eca50c93/360_0/44_5d833e63-0f2c-4f71-9a58-4fb738e3fbc0_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/9af7929c-6038-4dda-bb9b-1e34eca50c93/tl-PH-772c5e7e-7592-44b5-b0c7-6a3d3723f477/tl-PH-ecbc7e0f-b687-473c-b6b4-db2f561b2381.m3u8"
},

ep45: {
  video: "https://video-v6.mydramawave.com/vt/d422fbea-4c62-4bce-b08f-072b3ac4c8ab/360_0/45_27e76208-3609-48b8-845a-bc9a7aff48e2_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/d422fbea-4c62-4bce-b08f-072b3ac4c8ab/tl-PH-6a411a13-4f52-4bc3-a0fd-6ec1e424ee00/tl-PH-459600b7-f6ed-4095-a3af-19030e821f14.m3u8"
},

ep46: {
  video: "https://video-v81.mydramawave.com/vt/b0128b46-1ae2-467b-bb6a-e639c4094816/360_0/46_ad7f7ce8-d907-4c4b-b35a-d558633e55b0_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/b0128b46-1ae2-467b-bb6a-e639c4094816/tl-PH-a2412791-5480-4582-92e5-7f051da39b4f/tl-PH-c59559e0-ba8d-4152-8ecd-887e81d8cf8d.m3u8"
},

ep47: {
  video: "https://video-v6.mydramawave.com/vt/846a8565-cd91-40da-8174-3370e65f7158/360_0/47_fbb223f4-aca2-48e8-8c47-cc94ed62543f_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/846a8565-cd91-40da-8174-3370e65f7158/tl-PH-d8730013-3c57-4094-8fd5-34c186f94691/tl-PH-1a12cd91-6363-42bc-86ef-df8400334add.m3u8"
},

ep48: {
  video: "https://video-v6.mydramawave.com/vt/3d4b6413-d8f1-4eee-a5eb-1c06b9801ec4/360_0/48_0b6879b8-3fac-44e2-b4bc-db8afe43c640_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/3d4b6413-d8f1-4eee-a5eb-1c06b9801ec4/tl-PH-460fdcc5-4404-4e44-b627-372e2d654b25/tl-PH-41a0c519-57c6-41ea-9d2d-e8cb7b2bbdba.m3u8"
},

ep49: {
  video: "https://video-v81.mydramawave.com/vt/4c9b16a3-ae3c-4c1a-b281-8efd492d5fca/360_0/49_395ebba3-f084-4da6-8fa0-931a8b159eb0_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/4c9b16a3-ae3c-4c1a-b281-8efd492d5fca/tl-PH-0e29997f-480e-413e-a717-7c05b3c00711/tl-PH-ea616f3c-bdd4-4a60-b4aa-86ae78c213ef.m3u8"
},

ep50: {
  video: "https://video-v81.mydramawave.com/vt/938f1454-e38e-495d-8b19-056fe873d545/360_0/50_743bc354-1893-4345-9c0f-82a870fefbe5_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/938f1454-e38e-495d-8b19-056fe873d545/tl-PH-65301141-1a33-45e8-91f7-3c7669c63cb0/tl-PH-5a06bae5-888a-4bb1-b8de-c9b77258b580.m3u8"
},
  ep51: {
  video: "https://video-v81.mydramawave.com/vt/1f5677b2-9870-4d18-be9b-bac26b5cc052/360_0/51_ccf697da-42f9-4373-b66c-f81da2e4a072_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/1f5677b2-9870-4d18-be9b-bac26b5cc052/tl-PH-4b20e25f-626d-4281-bfb2-3ec69ce1da41/tl-PH-8cc96445-39f2-4116-b60b-929cb6c2f1b3.m3u8"
},

ep52: {
  video: "https://video-v81.mydramawave.com/vt/aa4e1f45-9c31-40b7-9ba3-1c756f0f6f64/360_0/52_739cb8ec-79cd-4679-964b-622225baa9e9_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/aa4e1f45-9c31-40b7-9ba3-1c756f0f6f64/tl-PH-8520361b-4a05-40de-8d13-2cc91aa6965a/tl-PH-19a88c2f-7b7d-42b2-9f75-903a60f1d0a7.m3u8"
},

ep53: {
  video: "https://video-v6.mydramawave.com/vt/54c48652-2d37-4acc-b1e4-e9d47e1d54e1/360_0/53_50fcc7c4-c4fa-4816-9710-9b48b0303de6_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/54c48652-2d37-4acc-b1e4-e9d47e1d54e1/tl-PH-ff525075-3181-4a06-9f15-de266a3482dd/tl-PH-559c7bca-febe-4c1a-bd93-e1abdb588951.m3u8"
},

ep54: {
  video: "https://video-v6.mydramawave.com/vt/47961899-aeea-4980-9459-c0ef13e96972/360_0/54_042ff03a-38ea-465e-bfe2-e7815ca1fdcd_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/47961899-aeea-4980-9459-c0ef13e96972/tl-PH-6bb7c7d9-b41b-46ba-80e0-4b418b7b5b27/tl-PH-b714cd94-6314-435d-a5a9-5c6d5a9dc7af.m3u8"
},

ep55: {
  video: "https://video-v6.mydramawave.com/vt/574d04aa-300e-4cbb-a854-02edf8f33c23/360_0/55_44fd6733-90af-469a-aa3d-c18dbe1464a4_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/787b4738-cc21-4911-b1a2-2d212cc02225/h265-392d9ae4-49b4-4332-9a3d-b70d89ad45d1.m3u8"
},

ep56: {
  video: "https://video-v6.mydramawave.com/vt/787b4738-cc21-4911-b1a2-2d212cc02225/360_0/56_aa41c03b-4403-4c19-b80d-2bab5c74477a_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/787b4738-cc21-4911-b1a2-2d212cc02225/tl-PH-56320012-dda4-4ff3-b436-9c9644acf125/tl-PH-be0fea34-b082-4462-bc95-02ae7823bb40.m3u8"
},

ep57: {
  video: "https://video-v81.mydramawave.com/vt/ccb0d757-c22c-412b-b136-12f4e9a408a1/360_0/57_9798f4d8-a03b-4b48-8f07-77074a36c9ea_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/ccb0d757-c22c-412b-b136-12f4e9a408a1/tl-PH-f54d5d42-d85a-4a85-b5cd-a208d4e0e7d2/tl-PH-a0e78305-f0ec-4d81-a839-e232097c380f.m3u8"
},

ep58: {
  video: "https://video-v6.mydramawave.com/vt/23ee7ea0-8d0f-44d5-a881-1cc7f5e3e0b3/360_0/58_1e7f53f1-71aa-4a22-9e6e-c292d182e618_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/23ee7ea0-8d0f-44d5-a881-1cc7f5e3e0b3/tl-PH-0018450c-c689-4914-aec8-561cf963f301/tl-PH-f7a7c194-34a5-4475-bb6e-4d8c1807642f.m3u8"
},

ep59: {
  video: "https://video-v81.mydramawave.com/vt/e1dcbbc1-205d-4338-9b04-54606b63830d/360_0/59_96a37053-a192-46fc-b622-8d3befa841b3_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/e1dcbbc1-205d-4338-9b04-54606b63830d/tl-PH-c8be47e7-8d77-4680-b226-b73b51f09963/tl-PH-5b218b01-7209-47ac-8fbf-8ac92fdf7a58.m3u8"
},

ep60: {
  video: "https://video-v6.mydramawave.com/vt/99ef77dd-c82e-4119-bed6-4da846850554/360_0/60_e2ee9518-0db0-475c-a0bc-13eb9850f53b_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/99ef77dd-c82e-4119-bed6-4da846850554/tl-PH-a9284d89-b4b7-4348-9ac7-c45cc30e60df/tl-PH-4ba56e16-7e12-4750-beff-bf4d549cb6ae.m3u8"
},
  ep61: {
  video: "https://video-v6.mydramawave.com/vt/724d7937-afa8-40ed-bd9b-44d48e06419f/360_0/61_3013b918-e265-4271-ae32-7b974d41a45c_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/724d7937-afa8-40ed-bd9b-44d48e06419f/tl-PH-0fc5a340-68e6-454e-9975-b837dfb0ba36/tl-PH-c13700ef-0640-4546-a676-aa99c69454e0.m3u8"
},

ep62: {
  video: "https://video-v81.mydramawave.com/vt/b20888b6-1586-4060-af74-5bd15c97ae0d/360_0/62_c5aa744a-e727-4424-bbbc-8488d791da70_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/b20888b6-1586-4060-af74-5bd15c97ae0d/tl-PH-9bd3ae0b-0ea4-40d8-816e-3d4ed9e953af/tl-PH-3e811e27-b7eb-429b-8b35-d5f1d1e802ef.m3u8"
},

ep63: {
  video: "https://video-v6.mydramawave.com/vt/65dcd909-4dcc-4f1f-96d7-328355d81ff0/360_0/63_8e745ca9-8c8f-4968-8780-21cd7be61a19_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/65dcd909-4dcc-4f1f-96d7-328355d81ff0/tl-PH-34a5a006-be4f-4ef9-8f82-a6c326289f3a/tl-PH-45c08ee2-c45a-46cf-a557-17f21e512466.m3u8"
},

ep64: {
  video: "https://video-v81.mydramawave.com/vt/c7fc44e6-3d77-4607-8d92-2d79e0912797/360_0/64_66a751a1-2d12-4541-9288-b10871c773d6_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/c7fc44e6-3d77-4607-8d92-2d79e0912797/tl-PH-50b114d6-86f2-4004-82b4-b02a39737ba6/tl-PH-a54c6e6b-3d39-40d0-af02-369cd8c448fd.m3u8"
},

ep65: {
  video: "https://video-v81.mydramawave.com/vt/95ebfd53-e2d2-4b48-b295-58ed276cd6df/360_0/65_e4385419-e3c9-4e8a-8ae7-693569ff93b3_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/95ebfd53-e2d2-4b48-b295-58ed276cd6df/tl-PH-21911c9b-358e-4351-b15c-d9af2f2057e6/tl-PH-fcbcc24a-a55a-468f-bfde-8ed746a8448c.m3u8"
},

ep66: {
  video: "https://video-v81.mydramawave.com/vt/3e553eba-db66-4d1c-be09-47ddb1443b9d/360_0/66_be139e66-fd28-4fed-b61c-8225d7da9c2c_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/3e553eba-db66-4d1c-be09-47ddb1443b9d/tl-PH-580df14b-b03c-466e-8e3c-d915ee2824ad/tl-PH-88430414-9a92-485d-a284-c26e73c3749a.m3u8"
},

ep67: {
  video: "https://video-v81.mydramawave.com/vt/12dffa57-6a3d-40fa-90c7-654a4c530a06/360_0/67_b996b48a-c9fe-45a5-9585-82fba4c7cee1_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/12dffa57-6a3d-40fa-90c7-654a4c530a06/tl-PH-e14c1bda-977f-48d1-98d6-0ad11e90d5e7/tl-PH-5050cfcd-a8b9-4987-a238-e7a010ab118f.m3u8"
},

ep68: {
  video: "https://video-v81.mydramawave.com/vt/58f0dd2f-44dc-4a4b-9172-0b1716dc6c90/360_0/68_de0305be-3247-475e-8b48-bf9ea9f2ddac_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/58f0dd2f-44dc-4a4b-9172-0b1716dc6c90/tl-PH-56672223-f10d-4a8e-b995-00204af3417a/tl-PH-f7df94e1-97de-49b4-89f7-4c00a0bf3761.m3u8"
},

ep69: {
  video: "https://video-v6.mydramawave.com/vt/8f2eb5f3-e39a-498d-b5d8-906e4e8b9d88/360_0/69_b52d17f4-acbc-4bb7-9264-f055d62d18a3_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/8f2eb5f3-e39a-498d-b5d8-906e4e8b9d88/tl-PH-e5b9ee6c-b0dc-4d4b-b157-201a96f33b90/tl-PH-420c5ea0-4faf-4265-b06f-a4db6b61ca33.m3u8"
},

ep70: {
  video: "https://video-v81.mydramawave.com/vt/b0a7777a-1269-4a0f-9d87-5ca9b6d6fc8a/360_0/70_709f0640-bc0e-4029-ada8-06792240bd67_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/b0a7777a-1269-4a0f-9d87-5ca9b6d6fc8a/tl-PH-34be4878-2b21-46b5-84c4-0b314fe18c51/tl-PH-acd69101-90ea-4ea8-97ca-95efcb92e123.m3u8"
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
