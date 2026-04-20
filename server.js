
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep1: {
  video: "https://video-v81.mydramawave.com/vt/e7525aa0-9db6-4b8a-8627-c97ddb8330ac/1_6e1f5136-ce99-4b62-98e8-7a67697c4dcd_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/e7525aa0-9db6-4b8a-8627-c97ddb8330ac/tl-PH-e5db3462-f009-4b90-8d09-16f3ca3110c6/tl-PH-cf733479-c69e-4e93-9ba1-b8764e9c502a.m3u8"
},

ep2: {
  video: "https://video-v81.mydramawave.com/vt/22ea21f0-c460-4e05-906e-53a951dc9814/2_e53084da-5ba9-43bc-8bb0-be6b4eb7acd7_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: ""
},

ep3: {
  video: "https://video-v81.mydramawave.com/vt/3b5c94a0-52e7-4407-afe6-048ec278a642/3_a562915c-0884-4215-bd33-8716f6cd08db_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/3b5c94a0-52e7-4407-afe6-048ec278a642/tl-PH-7210e0f2-fc6f-42e1-a537-2555077958c2/tl-PH-c5d33934-b12a-4a59-a0d5-b67f1f692481.m3u8"
},

ep4: {
  video: "https://video-v6.mydramawave.com/vt/11679640-4ff2-427e-9507-047354e94475/4_b5e2e67b-f9d6-4930-a34e-ff761c5ab02d_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/11679640-4ff2-427e-9507-047354e94475/tl-PH-f1c3d183-e79c-4e3e-b874-ec37c33e1cbf/tl-PH-e0450dc9-b37d-41d3-a525-f214510e02f8.m3u8"
},

ep5: {
  video: "https://video-v81.mydramawave.com/vt/3614f78d-76b9-491f-be1b-b68e0afd311d/5_862f1d13-b0ef-48bb-9ed0-087fdeeb0b72_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/3614f78d-76b9-491f-be1b-b68e0afd311d/tl-PH-9be87c9c-a70c-4c4a-84e7-272c1aaafc50/tl-PH-516b480f-e7c5-4533-a834-90b5bc90ed9c.m3u8"
},

ep6: {
  video: "https://video-v6.mydramawave.com/vt/ac41a7e2-707a-46b6-98c1-90b3a2158bbf/6_35fc77df-c1bf-475f-99c1-f9395c265204_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/ac41a7e2-707a-46b6-98c1-90b3a2158bbf/tl-PH-fffb11cc-6083-4a60-87b2-cc8ddbf310ab/tl-PH-324ae78f-94d7-41ad-ab87-9a517e0a9bb6.m3u8"
},

ep7: {
  video: "https://video-v6.mydramawave.com/vt/a68b4e3e-7a18-42c7-8a10-910531d44805/7_164ac004-c273-4c80-ae4b-8304821ca04d_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/a68b4e3e-7a18-42c7-8a10-910531d44805/tl-PH-9dedebd4-af91-4451-98f5-7528abb68052/tl-PH-72822efa-029a-40fd-b5ad-e4dfca1714bb.m3u8"
},

ep8: {
  video: "https://video-v6.mydramawave.com/vt/74247bc4-1148-4ed6-98ae-a0d39cf7c414/8_7a447ca4-8804-4555-826a-2d47ab075607_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/74247bc4-1148-4ed6-98ae-a0d39cf7c414/tl-PH-2c88af41-9117-405e-b02c-c88ac1896553/tl-PH-f048f6c7-eda7-41a3-8883-5f04e7708fd2.m3u8"
},

ep9: {
  video: "https://video-v6.mydramawave.com/vt/d51db9a4-7c78-4de8-b814-18699528e54d/9_ec9f23b9-10f3-4ccf-b0b4-dda508f5c772_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/d51db9a4-7c78-4de8-b814-18699528e54d/tl-PH-024aa650-fc34-46c2-98d0-52d883094843/tl-PH-577d6faa-c812-4c51-8e7d-6d212153f1a5.m3u8"
},

ep10: {
  video: "https://video-v81.mydramawave.com/vt/ce139b8a-11cf-4ab8-918e-d32411cce4e8/10_97043cd8-3856-418d-b872-ad638af9cc9d_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/ce139b8a-11cf-4ab8-918e-d32411cce4e8/tl-PH-cbe28ef4-0bad-43f7-aa12-afa39ba2d75c/tl-PH-7abca4ca-7dc8-4ad1-bd12-144cd5bcf4ee.m3u8"
},
  ep11: {
  video: "https://video-v6.mydramawave.com/vt/d61d14a1-cb3a-4fa5-90a6-7c00a8ac75fa/11_d3bbad82-22fd-41c7-801b-9ab0cad909d9_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/d61d14a1-cb3a-4fa5-90a6-7c00a8ac75fa/tl-PH-826654a7-133e-4b02-9c64-7c219093d38d/tl-PH-a0d5693d-f72a-4f78-b2e0-175e08999081.m3u8"
},

ep12: {
  video: "https://video-v81.mydramawave.com/vt/0aa5be80-7bca-481a-b84d-6ac9fa7ddc7c/12_92a88f46-1311-44e1-8f07-cb7f23d17273_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/0aa5be80-7bca-481a-b84d-6ac9fa7ddc7c/tl-PH-1c39a782-3620-4b2a-b489-759b045b268d/tl-PH-d13d8fc3-65b2-428d-99e6-b51f59c9c402.m3u8"
},

ep13: {
  video: "https://video-v6.mydramawave.com/vt/7f5de86a-4319-4f86-a77b-8d898e129479/13_28e61edb-13e3-4e51-8f6e-6c1781dcc416_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/7f5de86a-4319-4f86-a77b-8d898e129479/tl-PH-11095b59-b0a4-4e21-ad67-cbca0699e1b0/tl-PH-9973ab19-fc54-4653-bcae-00d33f200159.m3u8"
},

ep14: {
  video: "https://video-v6.mydramawave.com/vt/798dfe4f-7abd-4575-bf67-a8127b9d50b7/14_9c0d278a-743e-472e-b83b-3db2378d5be5_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/798dfe4f-7abd-4575-bf67-a8127b9d50b7/tl-PH-dac1e2d4-4cd6-478f-b110-6c1b70ce8937/tl-PH-c5d4c5b0-ebde-4273-b289-55e75d4fe0dd.m3u8"
},

ep15: {
  video: "https://video-v81.mydramawave.com/vt/3a3c9ab3-d1ca-406c-9c7c-8bcdb9e7a11c/15_de7acf9f-7ece-4dbb-ae1f-45f15636489f_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/3a3c9ab3-d1ca-406c-9c7c-8bcdb9e7a11c/tl-PH-7ab69637-f9fd-4bf7-ae88-72a55d288125/tl-PH-91584ee4-70a4-43bd-9041-d14990379218.m3u8"
},

ep16: {
  video: "https://video-v6.mydramawave.com/vt/ae3baa99-e1ea-4828-a792-a095c684b8cc/16_064c0058-f586-4e61-b120-15a66c77508a_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/ae3baa99-e1ea-4828-a792-a095c684b8cc/tl-PH-e80327be-77a0-4898-8a77-e2df63e74d60/tl-PH-75be345b-49df-4fec-97b9-4f1cfcded4d0.m3u8"
},

ep17: {
  video: "https://video-v81.mydramawave.com/vt/e8cf3aef-0397-4fa4-b752-7c4e71eae027/17_21069a67-4018-492b-aa5c-134b53e95e45_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/e8cf3aef-0397-4fa4-b752-7c4e71eae027/tl-PH-a1b64e18-21b1-4305-b80e-958be43ed9ce/tl-PH-8c1b09ce-c1b6-4da3-b82e-45594b3909d7.m3u8"
},

ep18: {
  video: "https://video-v6.mydramawave.com/vt/b67cbdcd-5e55-4637-a68c-e4c85e27a04b/18_c38b26d9-40b5-440a-9fb5-ef6308ef76ad_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/b67cbdcd-5e55-4637-a68c-e4c85e27a04b/tl-PH-1223368a-8bdf-4077-b078-82eddd0ba901/tl-PH-0543e5f8-1c62-477a-9e94-bfa552ea5db9.m3u8"
},

ep19: {
  video: "https://video-v6.mydramawave.com/vt/d99e03a2-cae4-46e2-b4df-44b423515573/19_4937e417-39f4-4d16-9b01-71c40a65d492_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/d99e03a2-cae4-46e2-b4df-44b423515573/tl-PH-fc3d3792-3f3a-4403-8b6d-07b6093925bf/tl-PH-aff11d3a-03f4-4eb8-b566-542be81f0b94.m3u8"
},

ep20: {
  video: "https://video-v81.mydramawave.com/vt/5e38e6ec-044d-4427-9d6d-0a46e77b2ff5/20_f4766f2a-e1e4-4224-a14d-bb5235a530dd_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/5e38e6ec-044d-4427-9d6d-0a46e77b2ff5/tl-PH-e40e5fe1-5d82-4069-ba44-48f2f0a3827f/tl-PH-37b4c1f4-d443-4016-9b21-ed8db1cd8f05.m3u8"
},

ep21: {
  video: "https://video-v6.mydramawave.com/vt/1699b08b-38f1-44a7-966e-27da0b61e3f3/21_b7831259-739d-4e5b-8c29-7874b3c9ae15_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/1699b08b-38f1-44a7-966e-27da0b61e3f3/tl-PH-83d90c9d-2391-4f6a-a6e0-26d409d6ad8f/tl-PH-e2c065b3-fc47-4d9d-ae0b-d0429b802a78.m3u8"
},

ep22: {
  video: "https://video-v6.mydramawave.com/vt/e95e35c4-2aee-460d-9425-62e1efbd084a/22_e359dec3-4433-4bef-9599-182ce1ce3d53_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/e95e35c4-2aee-460d-9425-62e1efbd084a/tl-PH-669a2de9-9dac-4237-b374-e2744fadc9d5/tl-PH-9d0ebdc3-ea7a-445c-8ec5-c6d78ca8e57f.m3u8"
},

ep23: {
  video: "https://video-v6.mydramawave.com/vt/61d12430-f093-489e-a757-6eff8e148c37/23_18100aa2-1427-4e11-a91c-7a2cc8a48d11_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/61d12430-f093-489e-a757-6eff8e148c37/tl-PH-ddc49c22-3bf8-4a08-9d06-a68d6ec436f8/tl-PH-529d6e1f-b33e-4847-8c8b-a4571ede424f.m3u8"
},

ep24: {
  video: "https://video-v81.mydramawave.com/vt/9ca36c26-718f-4242-b2b9-177eb57e20f0/24_3dd366fe-de4e-49a5-b59e-03c3ee04706e_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/9ca36c26-718f-4242-b2b9-177eb57e20f0/tl-PH-b6be752b-cffa-46a3-9629-de68495a0449/tl-PH-51f0acfc-34b0-4d32-9bfc-184a03376812.m3u8"
},

ep25: {
  video: "https://video-v6.mydramawave.com/vt/9e66e1cd-d909-44ba-8124-7e76e225a353/25_7fa15454-4e4f-45dd-a737-1d7e078bf916_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/9e66e1cd-d909-44ba-8124-7e76e225a353/tl-PH-e1da9782-00a7-427f-ad5b-74df68b1e60e/tl-PH-81557a5d-6ef6-4af9-9b0e-f9ecd5d6b23f.m3u8"
},

ep26: {
  video: "https://video-v6.mydramawave.com/vt/1d12f0f3-10f7-4fa4-a7e5-9bc8773cf3e9/26_4ac75f59-95b9-4548-88a9-278f0369bcd4_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/1d12f0f3-10f7-4fa4-a7e5-9bc8773cf3e9/tl-PH-00e2410a-bd52-4f5c-9422-47cf9996f073/tl-PH-37ecdccd-817a-465d-8a0b-9cee06408fd8.m3u8"
},

ep27: {
  video: "https://video-v81.mydramawave.com/vt/661bfd1d-af29-4c29-91be-86014021ef4c/27_5c54b7f9-05ba-4ff1-85b8-938b3875ccb9_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/661bfd1d-af29-4c29-91be-86014021ef4c/tl-PH-4177a365-f25e-4ee4-973c-1cb3ceabd3d9/tl-PH-097df296-3343-4f7b-b4b1-9da5b9621239.m3u8"
},

ep28: {
  video: "https://video-v81.mydramawave.com/vt/a069d0b1-2c22-4436-89ba-cbd61fd7f1c7/28_8a6659f5-821f-425b-a852-3307c8f188af_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a069d0b1-2c22-4436-89ba-cbd61fd7f1c7/tl-PH-60bb32f7-a52a-4182-b62f-977d02a5eee6/tl-PH-6c174c91-fbc7-46cb-aeb5-6f51a42edafc.m3u8"
},

ep29: {
  video: "https://video-v6.mydramawave.com/vt/956aa52c-9d96-4b96-84c4-cb64330d6c2c/29_5d81e453-533c-462a-a1f7-426706be7e93_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/956aa52c-9d96-4b96-84c4-cb64330d6c2c/tl-PH-03f72d3e-d6d7-4f45-a2bd-58f4d6faa851/tl-PH-933f5ee9-f26f-4145-8f45-3017398352fb.m3u8"
},

ep30: {
  video: "https://video-v6.mydramawave.com/vt/7112c503-a04e-4700-9595-91a45501ef4b/30_e891356f-8fa6-48f7-809d-4bedbc522852_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/7112c503-a04e-4700-9595-91a45501ef4b/tl-PH-8aeda155-da1d-476e-bc82-8919e040d6af/tl-PH-7b625e5e-62b7-42d1-af91-85270ef9eb4d.m3u8"
},
  ep31: {
  video: "https://video-v6.mydramawave.com/vt/b115b907-bff5-4a7f-9824-4aedf48524d5/31_bc1cdb01-0fb8-4604-a0f5-1641f2df645b_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/b115b907-bff5-4a7f-9824-4aedf48524d5/tl-PH-4df456dc-17b0-40f8-97a7-7b97f8803d69/tl-PH-12294ce0-fe5c-4af6-b11c-871b3abbff3c.m3u8"
},

ep32: {
  video: "https://video-v81.mydramawave.com/vt/b4ef0212-e271-4648-ac51-dbd8c8347187/32_9e22dcf3-7168-4855-aafb-faff29de764a_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/b4ef0212-e271-4648-ac51-dbd8c8347187/tl-PH-dc8b613b-1b03-4a97-8885-17f6e6df83b6/tl-PH-899583c2-d787-42f7-88ac-1daff99a2449.m3u8"
},

ep33: {
  video: "https://video-v6.mydramawave.com/vt/d6957aba-7b22-414c-9a68-c694a59e40ae/33_a56e058c-3c24-46e9-9d83-1677c5d8d85c_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/d6957aba-7b22-414c-9a68-c694a59e40ae/tl-PH-1dd653fc-b3e5-49d4-bceb-60c53092c574/tl-PH-8caf257d-af56-43e0-80f5-cbf9a8a5826d.m3u8"
},

ep34: {
  video: "https://video-v81.mydramawave.com/vt/c7de5073-64b4-4374-bc96-fe475bc2af0d/34_8e45ce7f-f774-4194-97e0-d54ea939dd48_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/c7de5073-64b4-4374-bc96-fe475bc2af0d/tl-PH-7ea1b7a8-ac20-4244-b4a7-2f84db5c3a18/tl-PH-282f6a55-56c0-4b85-be09-286b551ed8e7.m3u8"
},

ep35: {
  video: "https://video-v6.mydramawave.com/vt/6044f28b-a46a-4875-bef3-33cd8889242e/35_f263066d-61c4-4c4e-bea9-842bba1c2ab9_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/6044f28b-a46a-4875-bef3-33cd8889242e/tl-PH-ac4db23b-3204-43a8-86ac-ebb2ba03f418/tl-PH-a46a3411-7b24-4ec7-b5de-80b255befc82.m3u8"
},

ep36: {
  video: "https://video-v6.mydramawave.com/vt/35064ccb-4b26-442a-8d20-c41fdac07d81/36_3432b17d-c88c-42f3-8cb3-44f54e9b3b22_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/35064ccb-4b26-442a-8d20-c41fdac07d81/tl-PH-e60c6a91-2407-44ba-a586-ea3e6d10504a/tl-PH-a72443e9-fa95-4280-b49e-5b232e8d5f70.m3u8"
},

ep37: {
  video: "https://video-v6.mydramawave.com/vt/df1050a7-09f0-4f7d-ba59-549e248bda72/37_7a5d9dbf-351a-402c-a192-89bf2c602704_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/df1050a7-09f0-4f7d-ba59-549e248bda72/tl-PH-a3aa5b11-40fb-4fde-9718-f46e150bae84/tl-PH-de36b402-c97a-4987-a332-94eeeb9f90ca.m3u8"
},

ep38: {
  video: "https://video-v6.mydramawave.com/vt/bf8a13ca-6dba-4d22-bb15-64da885e6440/38_82693c34-fa9e-4668-b1a9-d4a5f433ee66_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/bf8a13ca-6dba-4d22-bb15-64da885e6440/tl-PH-37abb5e4-5abb-45d9-8d45-720459bf3e18/tl-PH-63141f82-33f0-4740-8355-3815679e28a6.m3u8"
},

ep39: {
  video: "https://video-v81.mydramawave.com/vt/d7eb2075-ad50-455e-8910-13f5f47cea9e/39_3913c6b2-684f-4528-ba20-e7afd72c510c_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/d7eb2075-ad50-455e-8910-13f5f47cea9e/tl-PH-23a521ee-b72d-46f7-a3dd-e0e44f760290/tl-PH-212aa078-252b-42fe-aa64-04f205e19004.m3u8"
},

ep40: {
  video: "https://video-v6.mydramawave.com/vt/dbecc4fc-a934-44df-8d2f-3394b4a5b1bf/40_6a9765b5-f387-4e8f-b231-e60e4bd14b53_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/dbecc4fc-a934-44df-8d2f-3394b4a5b1bf/tl-PH-721ca506-c9f1-47d8-8c89-edaf84ceae43/tl-PH-7121dd96-0ec5-47fa-a702-70a35188c644.m3u8"
},

ep41: {
  video: "https://video-v81.mydramawave.com/vt/c9e2fcca-3af1-400f-a1f9-738cbcd60f83/41_a9f1ac43-8abd-45e7-9c79-d5fb4edccf5e_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/c9e2fcca-3af1-400f-a1f9-738cbcd60f83/tl-PH-a2a4ddb4-33b2-4337-a93c-eada4fb856ba/tl-PH-9ee7bcfb-71ad-4e34-8721-13d4684d0cea.m3u8"
},

ep42: {
  video: "https://video-v81.mydramawave.com/vt/48db73a0-cea5-431e-8fac-efe8f62e0f4c/42_e039e255-a2be-4c86-97c2-34d13d83d86e_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/48db73a0-cea5-431e-8fac-efe8f62e0f4c/tl-PH-66b4e4bb-869b-46d4-9d11-22a7c9f137c6/tl-PH-1c1b0bd9-285e-48ae-bb56-02a20d7e3cc4.m3u8"
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
