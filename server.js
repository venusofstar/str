import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
super: {
  video: "https://vod3.cf.dmcdn.net/sec2(w_yWO_KDLP5JZtCbn1eAMj6-nMZ5RjcnF8pvj6yArylC3eJcHhMvozivAaA2o0oPgofoOxr8_J7bGTY0BMLE849WP1Fyz5GIGHbgdssxSuwSqE0BTBjsNyIyrYN6CcwKG0pXATpVikps7o2Oztnvx0lCRnflqiyxphGz1ErzqJ_89QaygUQb4UG4Cxo0-rOlAktsbupOlV3I36gDJVocEQ)/video/fmp4/648539110/h264_sd_vert/2/manifest.m3u8#cell=cf3",
  audio: "https://vod3.cf.dmcdn.net/sec2(Bf0Rk-2UDGXJrwPfx7ZwECm7IvrHGtctKOltiAz0KCppRhO1ywLeT0nqFkEsb-FQct6nN6fYVRmJkXpMuPqIbddBwKsl2AfTYIXrX8ab8cVjFK0WrLO2sCdtZ8XjCWhBtPcOG97rNEHmQKjCEm3HjfHWGtOki_K3xS2G7sRkOopoA6JO7q0PEXhtn3Mqn7ISPPAw6B0ko_1zuLnWyreXmg)/video/fmp4/648539110/aac_q1_0/manifest.m3u8"
},

ep2: {
  video: "https://video-v81.mydramawave.com/vt/17547663-dbdd-4de3-96e8-ad27a1b4ba24/360_0/2_0a6cd7b2-0b32-4168-a489-e67de120dd1d_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/17547663-dbdd-4de3-96e8-ad27a1b4ba24/tl-PH-b9c8074f-7872-49bd-9fd4-4b4238ac1a1c/tl-PH-0c782f4c-9a03-421c-b7ea-a21086568315.m3u8"
},

ep3: {
  video: "https://video-v6.mydramawave.com/vt/32ba542b-c7e5-43ea-a1cd-ace71c49b9eb/360_0/3_4ad4a406-8c90-4672-bff2-92bce19e90ae_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/32ba542b-c7e5-43ea-a1cd-ace71c49b9eb/tl-PH-f6be904f-9cfb-414e-b99c-fde24342abad/tl-PH-6bb78793-50e1-4490-9232-d404caf81bc0.m3u8"
},

ep4: {
  video: "https://video-v81.mydramawave.com/vt/e0337517-8b7d-401b-bbb9-0fae4f00cb50/360_0/4_577b329d-564c-453d-9450-ac2cc044c232_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/e0337517-8b7d-401b-bbb9-0fae4f00cb50/tl-PH-abc43230-a7d5-46d9-b7d6-525399ab803a/tl-PH-5c765c18-369a-443a-aa1e-7211d824a765.m3u8"
},

ep5: {
  video: "https://video-v6.mydramawave.com/vt/f512f003-a612-4a24-96e3-17fb2c6129eb/360_0/5_8798866b-9e38-4b2f-b842-b745d1ea5244_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/f512f003-a612-4a24-96e3-17fb2c6129eb/tl-PH-56920c9c-1fea-463c-b4b5-8da4e012857e/tl-PH-43133d57-00a2-4510-84d0-c990dc7270a9.m3u8"
},

ep6: {
  video: "https://video-v81.mydramawave.com/vt/6732f91e-bedc-494d-895b-6a4897317142/360_0/6_ca155434-84fc-4a31-8f9b-7a04be111c80_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/6732f91e-bedc-494d-895b-6a4897317142/tl-PH-e6e41561-7047-42a9-9673-768381f7585f/tl-PH-1ac4fa3a-3ecb-44e9-a242-96ad9510da6b.m3u8"
},

ep7: {
  video: "https://video-v81.mydramawave.com/vt/c5efbc3d-c657-4a9c-88dd-dbfeabd27149/360_0/7_5993633e-e494-4b14-a277-10e07c80094b_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/c5efbc3d-c657-4a9c-88dd-dbfeabd27149/tl-PH-dd0d43ad-7d76-4bb4-a073-3a0e02cd5da2/tl-PH-d6b3c7d7-4eda-461c-818a-94da5f31c59e.m3u8"
},

ep8: {
  video: "https://video-v6.mydramawave.com/vt/af27ad1a-de01-46ec-a7ff-764f2205b50a/360_0/8_7c914502-093a-4d1f-9545-40b94dc6aebf_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/af27ad1a-de01-46ec-a7ff-764f2205b50a/tl-PH-f16abb04-0e37-4c4d-8401-58761a3efd12/tl-PH-689b3f92-154c-4270-9489-68bc5df8f884.m3u8"
},

ep9: {
  video: "https://video-v81.mydramawave.com/vt/12c531de-3bf0-4199-af52-f75f92effcc3/360_0/9_9dbe250b-82be-4393-a39c-ee8e89b93392_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/12c531de-3bf0-4199-af52-f75f92effcc3/tl-PH-fc93030e-e970-4394-b60c-9900b35c2b48/tl-PH-72ba8da1-21bc-4529-bd25-118e2b5d22ec.m3u8"
},

ep10: {
  video: "https://video-v6.mydramawave.com/vt/1c2e13a2-a4f4-440c-aab9-08a94cade5c8/360_0/10_32c6b895-b98b-4a07-987d-8e803a3e1c98_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/1c2e13a2-a4f4-440c-aab9-08a94cade5c8/tl-PH-752a4da0-5357-41ad-a5ce-9d39c59b0622/tl-PH-929052b8-655a-47db-8d05-7727cd6c7eb1.m3u8"
},
  ep11: {
  video: "https://video-v81.mydramawave.com/vt/16adb980-a226-4379-8560-c5c6d8b3a80d/360_0/11_a25e137a-a7f3-4938-acc2-7062e5bcdb40_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/16adb980-a226-4379-8560-c5c6d8b3a80d/tl-PH-9eaae31f-4420-49bf-976c-3577a0fb6ca8/tl-PH-6c9f2703-d08e-4e7f-b8ad-b5bda53f25f8.m3u8"
},

ep12: {
  video: "https://video-v6.mydramawave.com/vt/41a71432-88f7-41b5-89cd-97d8d1d9173b/360_0/12_c754d7e1-fe48-4e74-9dfa-3c23adf04411_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/41a71432-88f7-41b5-89cd-97d8d1d9173b/tl-PH-6d2bb07a-19a6-46f4-b5e5-16da20e74d31/tl-PH-02fec1f4-25ea-4739-ad00-d80ff985433d.m3u8"
},

ep13: {
  video: "https://video-v6.mydramawave.com/vt/c29b39f9-9d00-4282-8d5e-03c67f2240db/360_0/13_2db62f6f-17b3-46ec-af10-a74b680326ee_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/c29b39f9-9d00-4282-8d5e-03c67f2240db/tl-PH-fd6c3db4-71eb-4f59-8a5d-b0881cbd5ca5/tl-PH-21e74dbf-5b61-467d-baf7-d32bbc9daef8.m3u8"
},

ep14: {
  video: "https://video-v6.mydramawave.com/vt/94ae71a1-19ff-4d31-8a9d-7d46c1d5623f/360_0/14_74ea4cc2-f4ac-40b5-b59e-7d5c339bb7e1_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/94ae71a1-19ff-4d31-8a9d-7d46c1d5623f/tl-PH-6076af04-34cd-44f7-af12-6ea1044ba140/tl-PH-731d17c7-6343-4a5f-9d09-48beb4a2296d.m3u8"
},

ep15: {
  video: "https://video-v81.mydramawave.com/vt/7ec3ff31-6e1a-4ee5-bcc3-338af952d523/360_0/15_faf47987-0f79-4457-b818-bb45027917bd_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/7ec3ff31-6e1a-4ee5-bcc3-338af952d523/tl-PH-e83e8014-5d35-44f4-9857-417e3b8c6dd5/tl-PH-c33c2167-6f6b-4ef4-aad6-b843bb0137c0.m3u8"
},

ep16: {
  video: "https://video-v81.mydramawave.com/vt/52d04ff0-4a60-4042-ae78-d8b1c623badc/360_0/16_fe7db98d-afe8-4b39-9311-b998bbdacde0_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/52d04ff0-4a60-4042-ae78-d8b1c623badc/tl-PH-d334dbcb-72c4-4fd4-b87c-a359d3be3869/tl-PH-b9e80914-cdd6-467b-9cd0-eb6b6f43a31a.m3u8"
},

ep17: {
  video: "https://video-v6.mydramawave.com/vt/7334235b-e949-4139-8303-ecf153d5b6b8/360_0/17_1171341c-201b-41ee-9d6a-9d7962eb8737_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/7334235b-e949-4139-8303-ecf153d5b6b8/tl-PH-a8c4267b-0d4a-4379-b100-da51bb136440/tl-PH-70ed3361-a421-4775-9bd3-da7bd8e0f429.m3u8"
},

ep18: {
  video: "https://video-v6.mydramawave.com/vt/1664d6d8-9f31-4e8b-8fd2-66bc6aa9d9f8/360_0/18_c68e4a2b-f46f-459b-9ce7-c95ee83599e6_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/1664d6d8-9f31-4e8b-8fd2-66bc6aa9d9f8/tl-PH-cbff5499-5a8b-4b86-a1b5-b9aaf0ab0fb0/tl-PH-5bd26e25-d9d8-402f-b4ef-22c660bf95ce.m3u8"
},

ep19: {
  video: "https://video-v81.mydramawave.com/vt/4c29ef75-596c-4729-883a-6c3e991ff2f1/360_0/19_876edf6a-a720-40e2-8f76-776d3b63c38d_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/4c29ef75-596c-4729-883a-6c3e991ff2f1/tl-PH-a6fd889c-8de4-431b-ac3f-39f7a4ae138d/tl-PH-8b70c87d-db6f-4c0f-8c35-49b0ab5a578f.m3u8"
},

ep20: {
  video: "https://video-v81.mydramawave.com/vt/2bdddb9c-ab48-4323-98e9-3c1ee76b2524/360_0/20_9a082f15-c463-4dda-818f-f031e004f978_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/2bdddb9c-ab48-4323-98e9-3c1ee76b2524/tl-PH-831ec93f-9320-49cf-86ab-67b5ba433ba5/tl-PH-2cdb9fcf-fba7-438f-8c2e-60278b4ffc36.m3u8"
},
  ep21: {
  video: "https://video-v6.mydramawave.com/vt/e2f415da-135b-4a33-af71-b0be8234693c/360_0/21_4f55167a-e052-453c-b3db-6c6922ee05ff_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/e2f415da-135b-4a33-af71-b0be8234693c/tl-PH-fdf7a974-d60b-44ee-bf4f-b99efb8e6748/tl-PH-20406688-ba32-4198-8899-dfa2c1e8a0da.m3u8"
},

ep22: {
  video: "https://video-v6.mydramawave.com/vt/36690297-1e02-47a5-96d7-d93e732dbee8/360_0/22_57e8a704-6c8a-40de-9fa3-5c6290151a9b_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/36690297-1e02-47a5-96d7-d93e732dbee8/tl-PH-693e3252-d747-4434-bd16-b93215ae9371/tl-PH-0ed39f9e-5ac6-48d5-9cb3-91ed5cfe8b9c.m3u8"
},

ep23: {
  video: "https://video-v6.mydramawave.com/vt/08f74636-468c-4def-8345-b62c51d00408/360_0/23_698108b6-7214-44ce-bed0-bea657a74fd1_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/08f74636-468c-4def-8345-b62c51d00408/tl-PH-f058c353-4965-44bc-99af-0b49d5cda869/tl-PH-c38f8d53-fc61-40dc-9ea9-a102f97298bc.m3u8"
},

ep24: {
  video: "https://video-v81.mydramawave.com/vt/3787bbdd-25b6-4d1a-b2e5-b3a339954fad/360_0/24_3f8a585e-8af7-40d9-b2e9-b3b94e514f4e_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/3787bbdd-25b6-4d1a-b2e5-b3a339954fad/tl-PH-6fceb8fa-b9a5-45a0-bc62-2aa92869b17a/tl-PH-4e00e2ae-3039-41d7-92e5-136f8b7b922b.m3u8"
},

ep25: {
  video: "https://video-v6.mydramawave.com/vt/9d65e273-efe7-4c58-9d0a-390bdb95dd43/360_0/25_57c1f9ce-631d-4ef6-ae11-6061b242428f_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/9d65e273-efe7-4c58-9d0a-390bdb95dd43/tl-PH-9374808f-a616-4e35-9279-3da45b2fb5ac/tl-PH-21966f3e-cd48-4e7c-a222-6b697b3ffc81.m3u8"
},

ep26: {
  video: "https://video-v6.mydramawave.com/vt/452cd77f-d89d-479e-8293-dd3cd9e3f7a1/360_0/26_1134a126-0b6f-4a9a-909a-b72673a196c8_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/452cd77f-d89d-479e-8293-dd3cd9e3f7a1/tl-PH-0930b3dd-64ce-44d3-acd4-872899f4c56a/tl-PH-d49bc764-d77b-4c1c-bc18-c791d6a56dc2.m3u8"
},

ep27: {
  video: "https://video-v6.mydramawave.com/vt/7647ec36-fa34-46d3-ab1d-784e39b11090/360_0/27_48983fdd-8b42-4131-af6c-000efb1c97e5_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/7647ec36-fa34-46d3-ab1d-784e39b11090/tl-PH-d1f01a18-c6a1-4496-a79f-aa74fb82a46d/tl-PH-112b5b95-43c8-45a7-ba44-c1c20b17abfc.m3u8"
},

ep28: {
  video: "https://video-v6.mydramawave.com/vt/049900f6-5659-4896-9e86-6d817ddb2db0/360_0/28_ccaebcd8-de02-4a55-8e14-94ffa5ade543_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/049900f6-5659-4896-9e86-6d817ddb2db0/tl-PH-d9d07ef3-eefb-4258-a034-62f3fdb582e1/tl-PH-eb566d41-b12d-4820-a4df-70c1732159b6.m3u8"
},

ep29: {
  video: "https://video-v6.mydramawave.com/vt/8239c347-a32f-4f3a-8a2a-19699aec4403/360_0/29_50d384ab-e12c-450d-aaf9-a86588290570_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/8239c347-a32f-4f3a-8a2a-19699aec4403/tl-PH-6aa9d195-7766-49ef-9019-376dd3f608da/tl-PH-3938f74b-a8b5-48d7-b1db-7f9708d2d6d2.m3u8"
},

ep30: {
  video: "https://video-v81.mydramawave.com/vt/f75b9e6f-64f9-493a-b4c3-331289c8ea9f/360_0/30_546596cd-fa87-42ee-aa15-2d39713d824d_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/f75b9e6f-64f9-493a-b4c3-331289c8ea9f/tl-PH-9f604d6a-89c4-44f9-988d-d472ccce2ef8/tl-PH-cf381ec1-8df6-4f61-903c-11efdf0891ea.m3u8"
},
  ep31: {
  video: "https://video-v81.mydramawave.com/vt/beec226c-1190-4cec-8899-67809f535fe4/360_0/31_1c338ec2-9d1b-4199-a432-167dd467118a_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/beec226c-1190-4cec-8899-67809f535fe4/tl-PH-ed3a0473-18c8-4ddc-85d4-f2708680741a/tl-PH-5b65dfe3-4fe5-48cb-8719-5eade876caae.m3u8"
},

ep32: {
  video: "https://video-v81.mydramawave.com/vt/98d2edfb-1210-4b6f-875f-6cbda7472d68/360_0/32_170183c0-8fce-4aad-a3ce-c8f0231c8c96_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/98d2edfb-1210-4b6f-875f-6cbda7472d68/tl-PH-c3d37ac0-a05a-4df2-852a-ad9154ade75a/tl-PH-d0b12caf-be43-4ff3-8255-57cb3468b9c5.m3u8"
},

ep33: {
  video: "https://video-v6.mydramawave.com/vt/efa22ff0-3628-41ac-b31e-841cf13fa400/360_0/33_076e2fdb-20a6-4e32-9e0c-7c5bc1059a9a_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/efa22ff0-3628-41ac-b31e-841cf13fa400/tl-PH-3172bb56-dd3e-4e59-b5c7-37070f1dde69/tl-PH-ce59963a-5e63-44ce-93f0-a8214123f700.m3u8"
},

ep34: {
  video: "https://video-v6.mydramawave.com/vt/e0cb061c-5b5d-4e0a-9f0a-69e8d31fed01/360_0/34_6ca7f6eb-535d-4025-a73f-b298ec80a7ea_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/e0cb061c-5b5d-4e0a-9f0a-69e8d31fed01/tl-PH-ad224583-d11d-474c-801a-30e91b2212cb/tl-PH-5b4b9b91-92b7-4080-8993-5f2cc689bb30.m3u8"
},

ep35: {
  video: "https://video-v81.mydramawave.com/vt/a15833bf-0235-475c-93ff-acdff82d7866/360_0/35_622f39ec-1085-42b7-9dc3-bc77a14e3d73_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a15833bf-0235-475c-93ff-acdff82d7866/tl-PH-f1b563b5-01ba-49e8-9ca8-7fc9f24a8235/tl-PH-77423fb4-468d-4eda-ae10-ce06a87a7052.m3u8"
},

ep36: {
  video: "https://video-v81.mydramawave.com/vt/ba080de9-75a8-465e-bbd0-d78328d64718/360_0/36_638c82ea-996c-43f1-8b1e-12d46cde89f1_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/ba080de9-75a8-465e-bbd0-d78328d64718/tl-PH-6418e511-e6fc-4dc5-a186-c233be092dec/tl-PH-d6cba544-a274-47db-852b-fa88422d9303.m3u8"
},

ep37: {
  video: "https://video-v81.mydramawave.com/vt/3472f624-4e74-4527-ac14-46eb94a7ce90/360_0/37_66bb444a-f179-41fd-b80f-fcb49bee5408_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/3472f624-4e74-4527-ac14-46eb94a7ce90/tl-PH-e23cc903-fce2-4243-b73e-32c0385f4223/tl-PH-ed198ab0-6f7d-494e-97a6-90b71b91f6d9.m3u8"
},

ep38: {
  video: "https://video-v81.mydramawave.com/vt/e1feb002-abaa-485b-a8d6-f549609746bb/360_0/38_ec883163-5382-4806-9fb2-1a01c36fa38f_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/e1feb002-abaa-485b-a8d6-f549609746bb/tl-PH-aa0bfcf3-454f-4362-a1ef-3a411c1a8f8b/tl-PH-c55306d6-e77e-4960-8f03-c1572a20a767.m3u8"
},

ep39: {
  video: "https://video-v6.mydramawave.com/vt/b5d4996a-5322-4d31-ad91-d136d5a052c0/360_0/39_4316209f-a6ef-4cdb-8c38-bd586aa38590_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/b5d4996a-5322-4d31-ad91-d136d5a052c0/tl-PH-599bc2f1-8c1b-4910-9aca-5d720ab964d9/tl-PH-256ec624-bf91-4049-8a44-2f3749e8dabd.m3u8"
},

ep40: {
  video: "https://video-v81.mydramawave.com/vt/4cc0ce4f-906d-4a9c-a439-ada879df2bde/360_0/40_0a4cf1d0-e653-40d7-b259-1d79efa183e5_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/4cc0ce4f-906d-4a9c-a439-ada879df2bde/tl-PH-1e092757-e4d6-4478-a247-e4f576a5e73d/tl-PH-c1f55072-a8cb-4fb7-ab1d-d61c9ba603b1.m3u8"
},
  ep41: {
  video: "https://video-v6.mydramawave.com/vt/e565eb59-04a1-4d6f-9327-7cb549bf21d6/360_0/41_32b1bff7-2a24-4d04-b8bb-679a0773e84f_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/e565eb59-04a1-4d6f-9327-7cb549bf21d6/tl-PH-654ef383-7763-407d-83f3-3f7aa295acd3/tl-PH-0aad66dc-6d2c-4e49-abf5-7510246961df.m3u8"
},

ep42: {
  video: "https://video-v6.mydramawave.com/vt/676ac13b-2003-495a-ba04-4d52ccfd83b7/360_0/42_d7594fc7-b70f-44ee-b660-b35a6fd2b44a_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/676ac13b-2003-495a-ba04-4d52ccfd83b7/tl-PH-0f608c3a-494a-4e73-9e4d-4da180b8e9dd/tl-PH-d8c9a1a5-1261-48da-bd9c-c73ee3aa9d92.m3u8"
},

ep43: {
  video: "https://video-v6.mydramawave.com/vt/5e707774-6643-4e90-b36e-50a0295693b5/360_0/43_d4fbe424-6a9a-4304-af99-0ea2694c7825_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/5e707774-6643-4e90-b36e-50a0295693b5/tl-PH-abb2cdc9-380e-47d0-a39c-058efb863ee5/tl-PH-cc5211c6-6865-400e-ab3b-10a8bbd87c5e.m3u8"
},

ep44: {
  video: "https://video-v81.mydramawave.com/vt/987c86ad-a4ae-4a81-8330-6a70749acf0c/360_0/44_344ce0db-83d6-467c-accb-920b04780bb0_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/987c86ad-a4ae-4a81-8330-6a70749acf0c/tl-PH-91029141-376f-42cb-b30f-da7d7de609b2/tl-PH-b9624ab3-e7e5-4314-8ea0-c71d22d86c39.m3u8"
},

ep45: {
  video: "https://video-v6.mydramawave.com/vt/ab54e852-1ca8-4c79-8768-92b7298eb663/360_0/45_5c330acc-0b07-4602-91f3-1344911a7e27_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/ab54e852-1ca8-4c79-8768-92b7298eb663/tl-PH-17d9c92f-f62b-49d2-97b2-d858fbab9605/tl-PH-7988ad22-bf92-4cb8-902b-5345eb7e4bc9.m3u8"
},

ep46: {
  video: "https://video-v6.mydramawave.com/vt/df9b0800-1924-4d23-b8d5-2e09593e2d02/360_0/46_b0a52779-00ec-425e-994f-4dfa0572b4d6_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/df9b0800-1924-4d23-b8d5-2e09593e2d02/tl-PH-50a4151b-9e21-4010-8540-fb06d02f151c/tl-PH-08054981-a1da-4b82-a690-af8df4c5697f.m3u8"
},

ep47: {
  video: "https://video-v6.mydramawave.com/vt/97b45907-5e5a-4b82-bcb4-6353b4444a50/360_0/47_edd0e08f-196c-48f0-a1fc-fbf6b110253d_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/97b45907-5e5a-4b82-bcb4-6353b4444a50/tl-PH-126cbde0-8742-42db-875f-4e4af9afe73b/tl-PH-e71ea00c-da08-4353-8076-ae69efc5c2d1.m3u8"
},

ep48: {
  video: "https://video-v6.mydramawave.com/vt/150268eb-d532-4b8b-90b6-dff4fec4e791/360_0/48_a07be0d9-b8bf-4d7f-9b63-30bf86254514_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/150268eb-d532-4b8b-90b6-dff4fec4e791/tl-PH-63f8ad1d-e165-4c52-ac6f-23696aac7526/tl-PH-22c1c51f-8166-48d2-a1ec-4fbe4bc14f83.m3u8"
},

ep49: {
  video: "https://video-v81.mydramawave.com/vt/a638d1ae-4999-486a-8faa-10c34ee4d53b/360_0/49_2f8c0423-f991-49e6-958c-593b4d84a31f_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a638d1ae-4999-486a-8faa-10c34ee4d53b/tl-PH-dd8b79bc-6952-4bda-8d64-9de65b4956fe/tl-PH-22b81140-db73-40e3-a574-b068f39df4ae.m3u8"
},

ep50: {
  video: "https://video-v81.mydramawave.com/vt/8f0b6135-f283-41dd-b529-fb10221e50d4/360_0/50_42025b50-e201-4c2f-95c5-993b80889d8a_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/8f0b6135-f283-41dd-b529-fb10221e50d4/tl-PH-f83be2fe-6637-4776-9b32-e3a79538bc68/tl-PH-1d5eda0d-02a6-4aee-babd-84fe1666651b.m3u8"
},
  ep51: {
  video: "https://video-v81.mydramawave.com/vt/7fd2603c-9f6c-4006-8b52-ba881230136d/360_0/51_4b687aef-fd43-457d-9116-b82c3fb1e6d4_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/7fd2603c-9f6c-4006-8b52-ba881230136d/tl-PH-403a865e-927c-42ba-91b4-2dbfc82dcb53/tl-PH-57776cc4-9728-40e8-8ef7-152c0defb5cd.m3u8"
},

ep52: {
  video: "https://video-v81.mydramawave.com/vt/ee190254-6c24-464a-b81f-e3ca932b3f84/360_0/52_c6700a04-f7dc-4621-acee-9cf0a89bd955_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/ee190254-6c24-464a-b81f-e3ca932b3f84/tl-PH-dd425a65-82dd-4ca1-816d-dca9fef3f4e5/tl-PH-eeb06671-3bb3-491a-8d25-79a8dee261e6.m3u8"
},

ep53: {
  video: "https://video-v6.mydramawave.com/vt/f59dad98-853d-4cce-99b4-bfd15a6e90bf/360_0/53_9dd63c91-0c1e-4b74-bf5d-e1b84e7e7363_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/f59dad98-853d-4cce-99b4-bfd15a6e90bf/tl-PH-8aa62887-ce28-4b3e-900d-a4c8c35eb34f/tl-PH-e1c03f1c-64cc-45b5-9a2c-dc2ae33946ee.m3u8"
},

ep54: {
  video: "https://video-v6.mydramawave.com/vt/1262f0d8-7ffb-45db-a265-9257d4b1c8d1/360_0/54_a1fc84d4-4b57-4075-acfa-083c73c0f5bb_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/1262f0d8-7ffb-45db-a265-9257d4b1c8d1/tl-PH-107484e8-ecc3-453e-a27f-b73e5abbff6c/tl-PH-8c5564a7-1378-43a2-8b1c-8166bb757807.m3u8"
},

ep55: {
  video: "https://video-v81.mydramawave.com/vt/53ecaf6c-1e98-4b74-929e-82e82798ed1e/360_0/55_bcb63934-2f8c-46ef-a2d6-91d871949703_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/53ecaf6c-1e98-4b74-929e-82e82798ed1e/tl-PH-965ba9b1-f9df-482a-9a76-156944c4657e/tl-PH-91a300c9-fe4b-47bd-aca3-14b5bc5fda55.m3u8"
},

ep56: {
  video: "https://video-v6.mydramawave.com/vt/c426b817-47a3-4133-a617-c0a74a6f16e6/360_0/56_28d6ecec-8501-4834-86cb-fc46aaac0a33_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/c426b817-47a3-4133-a617-c0a74a6f16e6/tl-PH-a5f16374-efdb-43eb-a4df-89424207383d/tl-PH-b3d13431-9255-4cb9-a19e-ed29d4f6a7ff.m3u8"
},

ep57: {
  video: "https://video-v81.mydramawave.com/vt/c1447623-8884-440a-9316-ce6f79eda5aa/360_0/57_fe179b21-6e79-4a95-b32d-c42306fc3924_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/c1447623-8884-440a-9316-ce6f79eda5aa/tl-PH-06ea63d1-dd8e-4466-9483-33ec3cb2274a/tl-PH-44810474-8ee4-4434-b414-c4a59978296f.m3u8"
},

ep58: {
  video: "https://video-v6.mydramawave.com/vt/e4a21d06-856f-4d6d-81b4-e84207b409c3/360_0/58_1dc7b3a4-5025-43d0-95c0-0d808aa6fb0a_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/e4a21d06-856f-4d6d-81b4-e84207b409c3/tl-PH-4d87a11e-0fb6-4264-8a77-638aaf4456f1/tl-PH-36b0343f-9fef-46d3-800d-faa940f1671b.m3u8"
},

ep59: {
  video: "https://video-v6.mydramawave.com/vt/5c6cb8dd-853c-43b9-a3d7-8c994a2853af/360_0/59_69c145d7-5b19-4531-9305-6c22a5e10fbc_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/5c6cb8dd-853c-43b9-a3d7-8c994a2853af/tl-PH-affa90d7-d920-4118-aa57-af5751cca65d/tl-PH-837148e3-827c-42a4-a8db-a7dae5534bd6.m3u8"
},

ep60: {
  video: "https://video-v81.mydramawave.com/vt/17086b8f-5ce3-431c-9451-97c47282b495/360_0/60_4b08f77b-df5d-4bff-956c-42da1f8b37d0_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/17086b8f-5ce3-431c-9451-97c47282b495/tl-PH-5c82a736-f153-4928-822b-83b0a930d297/tl-PH-1db76692-e80b-4ad9-a166-f453a9980c56.m3u8"
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
