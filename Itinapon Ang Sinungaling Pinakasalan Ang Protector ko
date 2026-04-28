import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep1: {
  video: "https://video-v81.mydramawave.com/vt/59607b5e-ca16-4a7b-afb1-aa7557620e66/360_0/1_c9f47369-39e4-44cb-9e7d-7e55cb78df83_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/59607b5e-ca16-4a7b-afb1-aa7557620e66/tl-PH-0f9ff2f9-3d93-418a-a47d-d7741dc1f5b7/tl-PH-74c889b0-937f-4d18-a85c-51a27a2aeb20.m3u8"
},

ep2: {
  video: "https://video-v81.mydramawave.com/vt/fb805c12-41f9-404a-9910-441278bb42ae/360_0/2_4b3347f0-bc72-40c8-bf8d-17b2700238fe_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/fb805c12-41f9-404a-9910-441278bb42ae/tl-PH-968993c5-5d69-45d8-be9f-48b1ee310629/tl-PH-153cd76b-c48b-4d99-8118-8bee063f1b0e.m3u8"
},

ep3: {
  video: "https://video-v81.mydramawave.com/vt/b0b6c5f6-bf7b-432a-b65a-64e693627bc0/360_0/3_7eeed6c9-8176-4076-ad5e-1bf0e4b3d0e0_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/b0b6c5f6-bf7b-432a-b65a-64e693627bc0/tl-PH-e3d49949-c03b-4d20-a364-564a8e1bed9f/tl-PH-8ac95153-8ae4-4d3e-af7c-713b15c20075.m3u8"
},

ep4: {
  video: "https://video-v6.mydramawave.com/vt/a33080e4-3b5c-41a9-b9dc-3be792fc9e0c/360_0/4_32c35daf-e25d-4150-8767-a83f4327290f_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/a33080e4-3b5c-41a9-b9dc-3be792fc9e0c/tl-PH-b2f3b0f8-9ef7-4b9f-b816-3e92daef61c4/tl-PH-7c22cc95-992c-43a3-83a1-37af344fb62d.m3u8"
},

ep5: {
  video: "https://video-v81.mydramawave.com/vt/68b84db5-fc30-4f2e-a7a0-0be8b5a493c6/360_0/5_dd704264-106a-4bdc-b9b0-0d857a80d0ec_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/68b84db5-fc30-4f2e-a7a0-0be8b5a493c6/tl-PH-953a9fb8-1da9-4533-85af-84f6ea2b354a/tl-PH-b4231eaf-c49f-48d0-ba65-d281bef68000.m3u8"
},

ep6: {
  video: "https://video-v81.mydramawave.com/vt/0a095986-6dfc-49a5-ac12-35c85979086c/360_0/6_4c35a39a-edfe-4dca-8aa5-4b60099e9fb6_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/0a095986-6dfc-49a5-ac12-35c85979086c/tl-PH-2a401a5a-d23f-4a8e-9c33-90f6420ee492/tl-PH-88f20862-94b7-427c-afae-8da90cdd72e2.m3u8"
},

ep7: {
  video: "https://video-v81.mydramawave.com/vt/632bbade-a125-49b0-aebd-0d8543832530/360_0/7_f652416b-4e57-48ba-abcc-f701b6b1eca6_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/632bbade-a125-49b0-aebd-0d8543832530/tl-PH-800a88ee-bba3-466a-a1bc-e3e8b1d6e420/tl-PH-24a59e10-f97a-413f-84f6-6c113804fd72.m3u8"
},

ep8: {
  video: "https://video-v81.mydramawave.com/vt/a17d0645-1801-49a1-bb2f-8d299f81797e/360_0/8_b348be81-5428-494c-bbb6-9d1ed9c5713d_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a17d0645-1801-49a1-bb2f-8d299f81797e/tl-PH-9a337f56-6c4a-4711-b877-ad6c8f2f83cd/tl-PH-57c0b305-3e89-4ef0-a3ba-1d058eddb726.m3u8"
},

ep9: {
  video: "https://video-v81.mydramawave.com/vt/0bf69ac3-689d-4958-b666-2db30d5ca1df/360_0/9_d9b6d3e2-d798-4249-8f95-383c85755c55_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/0bf69ac3-689d-4958-b666-2db30d5ca1df/tl-PH-41b25be4-801b-4bdd-b589-241456e41125/tl-PH-9e2fb041-f91b-48dc-acfb-e03529a3fe71.m3u8"
},

ep10: {
  video: "https://video-v81.mydramawave.com/vt/2044dd29-6add-440a-b457-65be83554d31/360_0/10_b18ebdfc-9dfe-464c-9224-454d978af00e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/2044dd29-6add-440a-b457-65be83554d31/tl-PH-374d4db0-cc2a-498b-909e-e5f92242be0e/tl-PH-c7cf3393-805e-42d8-855d-ef485e59bfa1.m3u8"
},
ep11: {
  video: "https://video-v6.mydramawave.com/vt/dbbdddef-bbc5-4998-bf3f-eb0dedcfa47d/360_0/11_0c64bd6c-2ef8-4fac-a768-8ade53fb3d98_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/dbbdddef-bbc5-4998-bf3f-eb0dedcfa47d/tl-PH-836fd436-0dcf-4c03-b079-a895876d5aad/tl-PH-38961261-10d5-4cd3-987a-dc2ddeab911e.m3u8"
},

ep12: {
  video: "https://video-v6.mydramawave.com/vt/aa77672b-163e-46ba-8c43-cbf3c152333b/360_0/12_aadf8483-6f7b-416f-bb81-7e42222d66e8_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/aa77672b-163e-46ba-8c43-cbf3c152333b/tl-PH-1573358b-8b88-45c9-aa1e-e84737839012/tl-PH-fb65b105-d5bc-4018-a314-dc416fd80e50.m3u8"
},

ep13: {
  video: "https://video-v6.mydramawave.com/vt/1243ae1c-e61d-4506-8a7e-935a78429678/360_0/13_b0ead1a5-1330-402f-8090-1ccd6f086546_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/1243ae1c-e61d-4506-8a7e-935a78429678/tl-PH-2e994dc4-6be7-4c2d-91ff-231e32d957b8/tl-PH-6f0c3840-f16f-49fa-8ee4-89cfeaff2278.m3u8"
},

ep14: {
  video: "https://video-v81.mydramawave.com/vt/bcf12cfe-b984-40d0-bfb8-31472d065e88/360_0/14_94552f3f-96c3-4d95-bfa1-7c36d7473600_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/bcf12cfe-b984-40d0-bfb8-31472d065e88/tl-PH-365c1fbe-6924-4c22-b142-94e1d71199d7/tl-PH-395e11e0-b9f4-488c-87d3-1945ce904fed.m3u8"
},

ep15: {
  video: "https://video-v81.mydramawave.com/vt/a98f7cb4-a45d-4d3c-8fd7-c4cf081e22b7/360_0/15_e80ac4eb-43be-42e6-bba7-fd7d4306df72_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a98f7cb4-a45d-4d3c-8fd7-c4cf081e22b7/tl-PH-efd55dd3-d5f1-4c01-95e3-8890fc5a7aad/tl-PH-6e08eefb-bb2e-453c-94ef-36c0ff1e0828.m3u8"
},

ep16: {
  video: "https://video-v6.mydramawave.com/vt/eca081fd-b64f-46dd-a2eb-ef86ad6a02fa/360_0/16_dcb83752-879b-459b-b2c0-f4c5aba5deeb_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/eca081fd-b64f-46dd-a2eb-ef86ad6a02fa/tl-PH-5a961ebd-b9fe-4224-a30c-4042d9a9fb8e/tl-PH-1756199a-180c-40cf-a709-40d3aff78c77.m3u8"
},

ep17: {
  video: "https://video-v81.mydramawave.com/vt/626dc08f-050d-4a70-8fe8-bc0503335a58/360_0/17_9d4fb746-5137-4aa3-92cf-74b937a97e8f_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/626dc08f-050d-4a70-8fe8-bc0503335a58/tl-PH-45a80ae8-14c4-4be4-860e-90e7f48054c2/tl-PH-52701703-6afb-4d90-b760-055ccb55142a.m3u8"
},

ep18: {
  video: "https://video-v6.mydramawave.com/vt/5647dd13-9c0d-4740-8175-10a86ff5c18e/360_0/18_e32bbef2-d9d9-436a-8dc0-fef7e5aa0667_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/5647dd13-9c0d-4740-8175-10a86ff5c18e/tl-PH-8e252ba4-1963-404b-b24d-19ef478d688f/tl-PH-5ad6bd98-8795-4191-8950-3fcb373032ba.m3u8"
},

ep19: {
  video: "https://video-v6.mydramawave.com/vt/8165a28a-dd7b-4645-895d-e70b0904062e/360_0/19_313e81cc-f144-40fa-82f8-3ad689637fd5_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/8165a28a-dd7b-4645-895d-e70b0904062e/tl-PH-9fd261c4-41d6-4dfd-9518-4a9b1bce0cc6/tl-PH-5d626660-477c-437b-a903-04e050849a30.m3u8"
},

ep20: {
  video: "https://video-v81.mydramawave.com/vt/8c7e4609-9e6f-4667-962c-2c664bc3d372/360_0/20_3785e14d-3f5a-4046-a59d-4f4da3895823_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/8c7e4609-9e6f-4667-962c-2c664bc3d372/tl-PH-eb71d5cc-ae0b-4f23-9726-6c78cda36f42/tl-PH-f96ed45c-91c4-4e5b-80b5-ba929ce261ea.m3u8"
},
ep21: {
  video: "https://video-v81.mydramawave.com/vt/8f4ec2d6-40c7-4751-a554-5aec6544a1fe/360_0/21_44df9187-2f54-460f-84a3-12baebb58deb_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/8f4ec2d6-40c7-4751-a554-5aec6544a1fe/tl-PH-daff2f44-c888-4ebf-ae7d-9ca9adf834e5/tl-PH-29c88c75-0e0e-4aa3-bd69-b52c4370065e.m3u8"
},

ep22: {
  video: "https://video-v81.mydramawave.com/vt/a403cf64-f833-4dbe-b5c9-4075500436ea/360_0/22_2390f199-b157-4e61-bc44-616afbd21d14_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a403cf64-f833-4dbe-b5c9-4075500436ea/tl-PH-c7dd8f0e-3951-4f61-b6c6-f06f8f079c27/tl-PH-224be5e9-dbe2-4ca7-9c1c-7213fcb24e14.m3u8"
},

ep23: {
  video: "https://video-v6.mydramawave.com/vt/a9725474-90fa-4595-b3d7-556ffd23d44a/360_0/23_2fe32d13-6805-48cb-bd91-aaa14ca3de2d_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/a9725474-90fa-4595-b3d7-556ffd23d44a/tl-PH-a7a72c32-2a92-468f-a812-7e77a6947904/tl-PH-0fc24ea5-4588-4852-9755-dd44a40b97dc.m3u8"
},

ep24: {
  video: "https://video-v6.mydramawave.com/vt/5622d98b-f9e5-4fa5-81a9-c6fbbdab531c/360_0/24_d7972718-0327-443b-b25a-0cdaa97a65f0_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/5622d98b-f9e5-4fa5-81a9-c6fbbdab531c/tl-PH-48b4cf07-8732-474e-9aa7-446127a7e312/tl-PH-4b6a8168-3d11-4e59-b33d-25e2acde0111.m3u8"
},

ep25: {
  video: "https://video-v6.mydramawave.com/vt/99dcd7a6-886e-4270-a7ee-3dc983cdd3fe/360_0/25_a00f556e-943d-4f87-b555-2a0e58ade485_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/99dcd7a6-886e-4270-a7ee-3dc983cdd3fe/tl-PH-1b3ba1dc-4fc1-4b59-9505-e93e0dcceeee/tl-PH-e7d7e523-b6d3-4460-a41f-c121135027cc.m3u8"
},

ep26: {
  video: "https://video-v81.mydramawave.com/vt/aa7741ee-c31c-4345-86d2-b60a26eee087/360_0/26_a73a7ecf-03f1-4a9a-ae95-71a1da0b57e3_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/aa7741ee-c31c-4345-86d2-b60a26eee087/tl-PH-23a9b754-7eb9-40d8-8d2a-4e36b9fe6ed0/tl-PH-6a2b4ee3-8194-422a-bc65-7200fa68a48c.m3u8"
},

ep27: {
  video: "https://video-v81.mydramawave.com/vt/95c464a5-363d-4b13-b73b-8bd1d444d938/360_0/27_1b7d5496-a980-4546-825b-6003d352c1bb_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/95c464a5-363d-4b13-b73b-8bd1d444d938/tl-PH-15bafe7b-0940-4cf6-86e5-c6a24ac636c6/tl-PH-4a1a1c33-3db3-4135-beb1-8fa66be0b3d4.m3u8"
},

ep28: {
  video: "https://video-v6.mydramawave.com/vt/f0d016ae-ea72-4d14-bf6a-c03bf7389180/360_0/28_ee96b273-376a-4537-bb95-9eeb8399a1fb_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/f0d016ae-ea72-4d14-bf6a-c03bf7389180/tl-PH-9062688e-9e85-40b5-9fd1-61f9a7126034/tl-PH-b781b50a-345b-4746-a633-ee360e3758c8.m3u8"
},

ep29: {
  video: "https://video-v81.mydramawave.com/vt/50b8582e-a263-4e37-ba21-5e9e2d29225e/360_0/29_0205f03c-5467-477e-8a68-79ed4d786cf7_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/50b8582e-a263-4e37-ba21-5e9e2d29225e/tl-PH-f1794076-865b-45f5-abf6-a910c7e37e91/tl-PH-7a3c197e-ed15-498e-b700-34ec9d2efb44.m3u8"
},

ep30: {
  video: "https://video-v6.mydramawave.com/vt/48d55cf2-ae97-489f-be6b-4f62f053aca9/360_0/30_6574fb72-945a-4ae7-af85-1790d7de6144_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/48d55cf2-ae97-489f-be6b-4f62f053aca9/tl-PH-0a02de90-9129-4a2a-853d-3eee9214f95a/tl-PH-83e34dcb-4040-4e71-b9fa-14c0f5e50255.m3u8"
},

ep31: {
  video: "https://video-v81.mydramawave.com/vt/d0941be8-a2bf-4764-8a5b-f995f3331cd2/360_0/31_8a066cbc-4ef6-4937-99f6-4824f1dc0010_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/d0941be8-a2bf-4764-8a5b-f995f3331cd2/tl-PH-e8eaeca2-4249-4b28-8e31-c4aeda857ab8/tl-PH-7582766e-a39e-4b0d-8fde-993ae2a7c7f1.m3u8"
},

ep32: {
  video: "https://video-v81.mydramawave.com/vt/c3b7a38f-00d9-4a92-9bb9-888953c4c505/360_0/32_eae35845-0215-40f7-9406-8c6014badc75_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/c3b7a38f-00d9-4a92-9bb9-888953c4c505/tl-PH-5e2acce9-bee1-47b7-b9e3-a1d1bb5f1c99/tl-PH-c111b890-f726-4164-bba6-ebf37e965f3e.m3u8"
},

ep33: {
  video: "https://video-v6.mydramawave.com/vt/5f4d5d6a-d538-4b2d-ac22-49f50c58786e/360_0/33_3db12b0e-e8d8-49dd-8b10-45d4fd0e541d_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/5f4d5d6a-d538-4b2d-ac22-49f50c58786e/tl-PH-9ac5324a-d443-4267-bdcd-75ab8b6c2918/tl-PH-518d6a14-3a2b-4f32-a660-3f66604679eb.m3u8"
},

ep34: {
  video: "https://video-v81.mydramawave.com/vt/f9647f8a-11c9-45ed-80ac-062630e9d1d3/360_0/34_04068a74-9e4e-4af2-84ca-fcdd2b575c3a_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/f9647f8a-11c9-45ed-80ac-062630e9d1d3/tl-PH-f7242650-23eb-4105-b931-a1656fd322e2/tl-PH-35c71417-2a4d-4a53-bc6b-9be642dadbff.m3u8"
},

ep35: {
  video: "https://video-v81.mydramawave.com/vt/74ca58b0-f0e4-4bd0-a75a-e4718553ca48/360_0/35_1900ebf8-a232-4ac8-8d81-6c6dbd311d64_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/74ca58b0-f0e4-4bd0-a75a-e4718553ca48/tl-PH-9ae3db1a-67da-4a58-ba78-e5803049b2bd/tl-PH-e36a7ae7-9453-43c7-9560-5988f2a52866.m3u8"
},

ep36: {
  video: "https://video-v81.mydramawave.com/vt/97865bdb-e7eb-42d7-a1da-aa06225e8a9a/360_0/36_49ab155b-7d84-44e5-b44b-568644641dc1_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/97865bdb-e7eb-42d7-a1da-aa06225e8a9a/tl-PH-32ecd492-2dc4-4ebf-845a-cad29668d8da/tl-PH-d977f29e-0122-40a0-a5c1-029e556b3842.m3u8"
},

ep37: {
  video: "https://video-v81.mydramawave.com/vt/7500ee4c-d4d8-4b5f-b1a8-1842b9f50acf/360_0/37_a270abde-13b6-4443-b40d-e9c08302e2b3_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/7500ee4c-d4d8-4b5f-b1a8-1842b9f50acf/tl-PH-2cbc6414-e5a1-4324-b6da-b225e1170f76/tl-PH-2f911698-8b19-4ae5-9058-af836b25b576.m3u8"
},

ep38: {
  video: "https://video-v6.mydramawave.com/vt/609e7326-bdc7-4a9a-bd31-c4f011d4c7e9/360_0/38_87b1a391-f5cd-49ee-8e66-db59d30b0caa_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/609e7326-bdc7-4a9a-bd31-c4f011d4c7e9/tl-PH-b2e2b499-b96c-4e47-8747-213ead5219e9/tl-PH-2c8db228-b2a7-42c8-a6a2-119c249125fc.m3u8"
},

ep39: {
  video: "https://video-v81.mydramawave.com/vt/de75b61e-3fb8-47bb-87a7-9e59c9dfb502/360_0/39_eece3a70-0573-4b53-80b3-3a1c14ba7d5e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/de75b61e-3fb8-47bb-87a7-9e59c9dfb502/tl-PH-48d44ea8-a3e5-4ec1-a6a8-45a028b1b702/tl-PH-4714eb19-f597-44e7-b6ca-1507ca094346.m3u8"
},

ep40: {
  video: "https://video-v81.mydramawave.com/vt/dbc0d9db-7606-48d7-a9f5-82dc62c31fd7/360_0/40_ff1d36b0-3051-40a3-a970-416e8c857f4d_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/dbc0d9db-7606-48d7-a9f5-82dc62c31fd7/tl-PH-134a5a84-4bae-4442-82d1-26b773163963/tl-PH-bc519718-d40f-4d80-b290-9664c3ed772f.m3u8"
},
ep41: {
  video: "https://video-v81.mydramawave.com/vt/b2e9f51b-5956-4691-bbb5-6391f952135e/360_0/41_6736def4-d9dd-45f8-8875-e0fcdf5a704c_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/b2e9f51b-5956-4691-bbb5-6391f952135e/tl-PH-b728452c-a027-4097-9dfc-492d54d885b3/tl-PH-4052db19-caf2-45ce-9d81-82a6d519ad1c.m3u8"
},

ep42: {
  video: "https://video-v6.mydramawave.com/vt/58229ff7-c020-4f9a-8884-c78776fc5628/360_0/42_bcd2993a-3946-446a-8382-b19efbbe6940_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/58229ff7-c020-4f9a-8884-c78776fc5628/tl-PH-5a07a33e-1296-41e8-a960-bfc2235372e5/tl-PH-a519cb79-77d0-47fe-88cd-61afa4da35a3.m3u8"
},

ep43: {
  video: "https://video-v6.mydramawave.com/vt/2fe55ea2-4ec2-4eb2-8c83-2cde9b3a6a98/360_0/43_f4760637-00f6-4102-baa2-4fdefda12509_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/2fe55ea2-4ec2-4eb2-8c83-2cde9b3a6a98/tl-PH-c9a0c380-8356-4efa-82ff-246de36e1699/tl-PH-ae32b5fe-3d98-4038-abf2-dcfa017d20bd.m3u8"
},

ep44: {
  video: "https://video-v81.mydramawave.com/vt/61e71c5f-95ab-4997-8117-1aba20436114/360_0/44_e1904efb-d336-4a1b-a0d1-671b03040cf3_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/61e71c5f-95ab-4997-8117-1aba20436114/tl-PH-d1d53467-acaa-4f65-80c3-9e3dc13bb855/tl-PH-424fd3c2-ef46-49c2-8603-3a6dfa5cd34d.m3u8"
},

ep45: {
  video: "https://video-v81.mydramawave.com/vt/e3624cac-65f4-45e3-8917-b8c1cf30c64f/360_0/45_5523b670-0c96-4ec8-bb8b-9c5bd99c4e5f_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/e3624cac-65f4-45e3-8917-b8c1cf30c64f/tl-PH-53ca7ac0-71da-4a34-b4e5-3dde990cfb85/tl-PH-5ac9ceb4-b036-42a2-be50-a7e25834f367.m3u8"
},

ep46: {
  video: "https://video-v6.mydramawave.com/vt/cd60db7a-a9dc-4b0e-b39e-ae5bc6cbe6b2/360_0/46_c0be0bcf-c143-4086-8682-941abd255abd_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/cd60db7a-a9dc-4b0e-b39e-ae5bc6cbe6b2/tl-PH-d77d241f-d3be-4095-909f-75d93972a2e4/tl-PH-59e13bf0-aec2-4233-a3e0-c5e22dabc2cc.m3u8"
},

ep47: {
  video: "https://video-v81.mydramawave.com/vt/237bfdb9-e0dc-4a56-a7af-842787318937/360_0/47_cb7bc53b-5f05-454d-99c9-2c7cba8bec0f_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/237bfdb9-e0dc-4a56-a7af-842787318937/tl-PH-5f528ff4-2ba4-4836-912f-d3de69a8322b/tl-PH-3d9568a8-0cf2-4e3b-a8a0-04eb1ab078c3.m3u8"
},

ep48: {
  video: "https://video-v6.mydramawave.com/vt/5c48b887-f68e-463a-ade7-abaa690aa886/360_0/48_ae8f3347-7451-4f56-91ea-bf28d403d716_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/5c48b887-f68e-463a-ade7-abaa690aa886/tl-PH-5ade9df1-d183-4f27-8597-df4d8b0c6a9b/tl-PH-1de09c49-f173-4519-b650-75808bdcadfa.m3u8"
},

ep49: {
  video: "https://video-v81.mydramawave.com/vt/3a0d2b01-4874-4a30-8a9b-a59d9347cdd7/360_0/49_da8960f6-3394-4c16-b2a7-8e547ac7540d_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/3a0d2b01-4874-4a30-8a9b-a59d9347cdd7/tl-PH-221b7077-e269-439b-83ae-64fffb40361e/tl-PH-cfd73647-efad-4a1a-b356-735540b6b166.m3u8"
},

ep50: {
  video: "https://video-v6.mydramawave.com/vt/41e3b0e4-3876-46a4-89b0-41a32b4766fa/360_0/50_cd998e33-31c8-4b01-8def-63a4544b7378_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/41e3b0e4-3876-46a4-89b0-41a32b4766fa/tl-PH-dc0cbe26-4be7-49ce-9e51-01d82a3422d0/tl-PH-9e870bdc-7b86-4e80-adf4-8acd1a49b730.m3u8"
},

ep51: {
  video: "https://video-v81.mydramawave.com/vt/9dd1c616-d556-4f6a-9d6d-3133cb80a80b/360_0/51_b25859e8-33c1-41a2-b74d-02e5c1999337_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/9dd1c616-d556-4f6a-9d6d-3133cb80a80b/tl-PH-4b7a57ee-9e5d-402b-bd64-88ef09953ba8/tl-PH-14b4a4d6-923f-480d-8b8f-9828399dc659.m3u8"
},

ep52: {
  video: "https://video-v6.mydramawave.com/vt/aa003891-0731-4a89-9d48-aa9a0cc0a9b7/360_0/52_f3d7ca08-6406-462e-a6a8-17bf4a7f67c9_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/aa003891-0731-4a89-9d48-aa9a0cc0a9b7/tl-PH-110ef297-01eb-4ae9-8c5c-01458ff1613e/tl-PH-10ab0b5a-aaf9-4b70-bd55-7149b0072f04.m3u8"
},

ep53: {
  video: "https://video-v81.mydramawave.com/vt/205f4b6b-ac55-4068-9720-11f82d85212f/360_0/53_dd4262cf-e206-4e80-a71b-debf32c1ed2e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/205f4b6b-ac55-4068-9720-11f82d85212f/tl-PH-67f28e35-c000-4f57-a490-aa6e12073e33/tl-PH-2f630d86-8a3d-421e-b842-287f28bb0f0d.m3u8"
},

ep54: {
  video: "https://video-v6.mydramawave.com/vt/1feba3c9-f448-41ed-ab30-ee1316eb8369/360_0/54_0496dc20-25bc-4553-968d-0486c6540504_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/1feba3c9-f448-41ed-ab30-ee1316eb8369/tl-PH-4a7eb3be-df5e-4224-a8d9-200ceb7c4dd8/tl-PH-efe8fbea-01e8-4f2f-bbd7-a68eb78d1c27.m3u8"
},

ep55: {
  video: "https://video-v6.mydramawave.com/vt/9d66fc78-bc6e-4790-a943-027365cf0cfb/360_0/55_d4a94b6f-efc3-4d37-975e-96ac9e0b42a4_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/9d66fc78-bc6e-4790-a943-027365cf0cfb/tl-PH-afaccd94-ea01-4a09-913f-6db5a0ca7898/tl-PH-f1ac9326-7e93-45f5-8cae-e6f16953bdfe.m3u8"
},

ep56: {
  video: "https://video-v81.mydramawave.com/vt/2c9cf8d2-0715-46fa-bf8e-e63d16113b5c/360_0/56_625990cc-ae95-440f-8ff0-cb7390cdd296_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/2c9cf8d2-0715-46fa-bf8e-e63d16113b5c/tl-PH-6d159f41-9ea4-429c-9187-46f48e21e805/tl-PH-d370d069-3470-4e0c-a613-0b39902f1530.m3u8"
},

ep57: {
  video: "https://video-v81.mydramawave.com/vt/5d70e30f-0d67-4967-8f88-693d44167ba2/360_0/57_7947f1ba-e636-4689-a88e-2112ff234bb1_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/5d70e30f-0d67-4967-8f88-693d44167ba2/tl-PH-7ea2102b-471f-40f0-91be-9bb4294c4053/tl-PH-18f53d70-81cd-4624-b122-e2dfaea385e7.m3u8"
},

ep58: {
  video: "https://video-v6.mydramawave.com/vt/a00d7ba6-9607-4856-91c9-f8ec7fd2830b/360_0/58_e1c32301-19e9-427e-8965-317198745d02_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/a00d7ba6-9607-4856-91c9-f8ec7fd2830b/tl-PH-64c378fe-68d5-413f-a807-9df8c5846b50/tl-PH-607c90bc-fc09-498b-adb7-83b67ce942dc.m3u8"
},

ep59: {
  video: "https://video-v6.mydramawave.com/vt/7dd6fc6f-6288-4d55-bcfa-088801114a17/360_0/59_ffed459d-d313-412b-a8df-c606ef837ee9_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/7dd6fc6f-6288-4d55-bcfa-088801114a17/tl-PH-a0448ee2-9625-41e0-bd30-99385cb295b3/tl-PH-cd538dd4-2e4a-4ad8-9535-6e11ccf5cd7b.m3u8"
},

ep60: {
  video: "https://video-v81.mydramawave.com/vt/7cb533d3-31dd-4838-ab5e-b9df64df291f/360_0/60_9fcd0538-47d4-4955-b185-7bb65f51d22d_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/7cb533d3-31dd-4838-ab5e-b9df64df291f/tl-PH-31981a7b-7a28-45ec-8f54-3bfdb8c3193c/tl-PH-f712c085-8a40-4a23-8437-c0f7d1aa9af4.m3u8"
},
ep61: {
  video: "https://video-v6.mydramawave.com/vt/5fc9c8f6-4a3a-4abb-a7d9-00bbac18bfc9/360_0/61_01bd0431-014e-4051-b7d7-81b4dbb8bf38_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/5fc9c8f6-4a3a-4abb-a7d9-00bbac18bfc9/tl-PH-e64aafb8-c229-4d5d-a2b6-1570af78b002/tl-PH-fedc82dd-80d8-48da-90cf-bb6eff82a1c2.m3u8"
},

ep62: {
  video: "https://video-v6.mydramawave.com/vt/780c0560-39f9-4d08-99f3-52c2e779f9bf/360_0/62_896825c9-52e3-40b4-a8db-272ff9f53360_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/780c0560-39f9-4d08-99f3-52c2e779f9bf/tl-PH-bb904d3b-20be-45df-b706-533c0e9f0f29/tl-PH-01ca4b6b-2610-4585-b176-5bffe8b655a6.m3u8"
},

ep63: {
  video: "https://video-v6.mydramawave.com/vt/5c36d067-cb98-4101-bd4d-23aecbea8588/360_0/63_345fcffa-b8fd-413f-b4b4-8c99233dbc2e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/5c36d067-cb98-4101-bd4d-23aecbea8588/tl-PH-95ba48ea-1b11-4d16-80b2-3f470793f8c1/tl-PH-9d9c475e-d9b9-46f7-ad7f-804944a27afc.m3u8"
},

ep64: {
  video: "https://video-v81.mydramawave.com/vt/1a8f123d-bf46-465e-94f2-2abb6ce23ec7/360_0/64_dd8c77ea-d3c0-486b-bfb3-d8638e637224_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/1a8f123d-bf46-465e-94f2-2abb6ce23ec7/tl-PH-adbd7dac-6106-4526-8884-a2c850547957/tl-PH-ed31324b-59d1-425f-9388-6d3f6466951c.m3u8"
},

ep65: {
  video: "https://video-v6.mydramawave.com/vt/74adca09-7da2-4c2e-99ac-08a09a36bf02/360_0/65_32269862-aec0-47bd-906c-d57df3717ef0_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/74adca09-7da2-4c2e-99ac-08a09a36bf02/tl-PH-7a6587d0-331a-4264-9df0-a87b8f53f92d/tl-PH-b5c40ba1-b368-45fd-ab68-f7d05db8f09b.m3u8"
},

ep66: {
  video: "https://video-v81.mydramawave.com/vt/8918d3cd-adf9-4b35-8647-fabf3802efac/360_0/66_0a058048-acd8-4950-8094-e1fdff01c90e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/8918d3cd-adf9-4b35-8647-fabf3802efac/tl-PH-73d06bbb-ca0b-4138-9b41-eaf6887b621e/tl-PH-44d60633-bd6e-4777-a04a-3bf8bd34a6da.m3u8"
},

ep67: {
  video: "https://video-v81.mydramawave.com/vt/58b1d81b-9335-4ca0-8c35-8a387bcf5a5e/360_0/67_2d9e5ae0-6e56-4f89-bd90-d6a660a18441_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/58b1d81b-9335-4ca0-8c35-8a387bcf5a5e/tl-PH-4808e41e-fe46-4321-bbc2-6c841c89c43d/tl-PH-9dc79936-996a-44f4-9795-820ffabd5835.m3u8"
},

ep68: {
  video: "https://video-v6.mydramawave.com/vt/f6798439-4c0d-4551-9411-c61971095677/360_0/68_169b5376-252b-4f5e-b701-e456493bce50_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/f6798439-4c0d-4551-9411-c61971095677/tl-PH-69c1a3c2-3780-4b61-99c2-1d20e3e57405/tl-PH-d07883eb-9f61-4d0c-9784-5f6dffdb9f8e.m3u8"
},

ep69: {
  video: "https://video-v81.mydramawave.com/vt/5c3091bd-2e9a-47da-9316-7122e100bfec/360_0/69_655ee09c-69a8-407c-9efd-e627eefc9476_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/5c3091bd-2e9a-47da-9316-7122e100bfec/tl-PH-2bb7a329-f135-4cd7-89b8-5707dbc6674b/tl-PH-5bec2bed-bdd6-496a-8eea-180c102c7e0e.m3u8"
},

ep70: {
  video: "https://video-v81.mydramawave.com/vt/05fe290d-1476-430f-bcc3-054c82a459f9/360_0/70_1fdb3352-5a96-4f74-8dff-855e19d0fa1f_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/05fe290d-1476-430f-bcc3-054c82a459f9/tl-PH-aa0cd79a-200c-4fbc-b8d9-35b0690fea2f/tl-PH-9b8c3644-35ea-4690-94d5-369d1cc101cc.m3u8"
},

ep71: {
  video: "https://video-v6.mydramawave.com/vt/caaf5e18-103f-41b8-8f51-3e630a91ef8b/360_0/71_997eb9e2-eb9c-4152-a772-7a0207d58b28_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/caaf5e18-103f-41b8-8f51-3e630a91ef8b/tl-PH-42f83a75-c4d5-4270-8745-2bcdc05b3d33/tl-PH-49c899bf-c6c7-4abf-b28c-cff982742416.m3u8"
},

ep72: {
  video: "https://video-v81.mydramawave.com/vt/e21aae98-667a-42f9-971d-1867199fd80d/360_0/72_cf067ab5-1f20-45ab-9920-67abfe0114bc_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/e21aae98-667a-42f9-971d-1867199fd80d/tl-PH-2e3f6156-bd8a-4adc-b21d-7c3be01c07d9/tl-PH-73f9cc7e-5290-4e15-9091-0d8ffaeb12d9.m3u8"
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
