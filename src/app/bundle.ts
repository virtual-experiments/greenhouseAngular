/* Generated from Java with JSweet 3.0.0 - http://www.jsweet.org */
export namespace greenhouse.computations {
    export class CarbonSupply {
        public static XK: number = 0.58;

        public static XM: number = 0.1;

        public static D: number = 2.593;

        public static Q10: number = 1.4;

        public static RMRL: number = 0.015;

        public static RMRF: number = 0.01;

        public static photosynthesis(co2: number, tIn: number, ppfd: number, ini: greenhouse.computations.Init): number {
            const lfMAX: number = CarbonSupply.getLFMAX(co2, tIn);
            const lai: number = ini.PLAR2;
            let gpf: number = 0.0;
            const cd: number = 50.0 * Math.exp(0.0295 * (tIn - 23.0));
            const qE: number = 0.084 * ((co2 - cd) / co2);
            if (ppfd >= 0.001){
                const top: number = 0.9 * lfMAX + qE * 0.58 * ppfd;
                const bot: number = 0.9 * lfMAX + qE * 0.58 * ppfd * Math.exp(-0.58 * lai * 2.2);
                gpf = lfMAX / 0.58 * Math.log(top / bot);
                gpf *= 0.682;
                gpf = gpf * 3.8016 / 2.2;
            }
            return gpf;
        }

        public static respiration(tIn: number, wl: number, ws: number, wf: number): number {
            const mresp: number = Math.pow(1.4, 0.1 * tIn - 2.0) * (0.015 * (wl + ws) + 0.01 * wf);
            return mresp;
        }

        public static getLFMAX(co2: number, tHouse: number): number {
            const tau1: number = 0.1;
            const tau2: number = 0.03;
            let pMAX: number;
            if (co2 <= 1500.0){
                pMAX = tau1 * co2;
            } else {
                pMAX = tau1 * 1500.0 + tau2 * (co2 - 1500.0);
            }
            pMAX *= greenhouse.computations.Interpol.interpolatePGRED(tHouse);
            return pMAX;
        }
    }
    //CarbonSupply["__class"] = "greenhouse.computations.CarbonSupply";

}
export namespace greenhouse.computations {
    export class CorrFactors {
        public static SCO2: number = 3.0E-4;

        public static sCO2(co2: number): number {
            const fC: number = 1.0 + 3.0E-4 * (co2 - 350);
            return fC;
        }
    }
    //CorrFactors["__class"] = "greenhouse.computations.CorrFactors";

}
export namespace greenhouse.computations {
    export class CTE {
        static __static_initialized: boolean = false;
        static __static_initialize() { if (!CTE.__static_initialized) { CTE.__static_initialized = true; CTE.__static_initializer_0(); } }

        public static PLM2: number = 2.2;

        public static TPL: number = 0.333;

        public static EPS: number = 1.0E-11;

        public static GREF: number = 0.75;

        public static FTRUSN: number = 10.0;

        public static SLAMX: number = 0.06;

        public static SLAMN: number = 0.022;

        public static FRPT: number = 0.43;

        public static NBFPT: number[]; public static NBFPT_$LI$(): number[] { CTE.__static_initialize();  return CTE.NBFPT; }

        public static NFAST: number = 24;

        public static DTFAST: number = 0.041666666666666664;

        static  __static_initializer_0() {
            CTE.NBFPT = [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0];
        }
    }
    //CTE["__class"] = "greenhouse.computations.CTE";

}
export namespace greenhouse.computations {
    export class Date {
        public static dateToInt(day: number, month: number): number {
            let numberOfDays: number = 0;
            for(let mo: number = 1; mo < month; ++mo) {{
                switch((mo)) {
                case 1:
                    {
                        numberOfDays += 31;
                        break;
                    };
                case 2:
                    {
                        numberOfDays += 28;
                        break;
                    };
                case 3:
                    {
                        numberOfDays += 31;
                        break;
                    };
                case 4:
                    {
                        numberOfDays += 30;
                        break;
                    };
                case 5:
                    {
                        numberOfDays += 31;
                        break;
                    };
                case 6:
                    {
                        numberOfDays += 30;
                        break;
                    };
                case 7:
                    {
                        numberOfDays += 31;
                        break;
                    };
                case 8:
                    {
                        numberOfDays += 31;
                        break;
                    };
                case 9:
                    {
                        numberOfDays += 30;
                        break;
                    };
                case 10:
                    {
                        numberOfDays += 31;
                        break;
                    };
                case 11:
                    {
                        numberOfDays += 30;
                        break;
                    };
                }
            };}
            numberOfDays += day;
            return numberOfDays;
        }
    }
    //Date["__class"] = "greenhouse.computations.Date";

}
export namespace greenhouse.computations {
    export class Devrate6 {
        public static FPNPT: number = 0.8;

        public static FRLG: number = 9.0;

        public static FRST: number = 0.33;

        public static devrate6(day: number, co2: number, ini: greenhouse.computations.Init, iRDVLV: number, iTEMFAC: number, iRDVFR: number): number {
            const genr: number = iTEMFAC * greenhouse.computations.Interpol.interpolateGENRAT(ini.PLSTN);
            ini.PLSTN += genr;
            ini.NBRU = (<number>Math.floor((ini.PLSTN - 10.0 + 4.003003003003003) * 0.333 / 1.333)|0);
            ini.NBRU = Math.max(0, ini.NBRU);
            ini.NBRUP = (<number>Math.floor((ini.PLSTN - 10.0 - 9.0 + 4.003003003003003) * 0.333 / 1.333)|0);
            ini.NBRUP = Math.max(0, ini.NBRUP);
            ini.NBLV = (<number>Math.floor(ini.PLSTN)|0) - ini.NBRU;
            ini.TRCNF = 0.0;
            for(let devCounter: number = 1; devCounter <= ini.NBRUP; ++devCounter) {{
                try {
                    const xx: number = ini.XNFT[devCounter - 1];
                    ini.XNFT[devCounter - 1] = Math.min(greenhouse.computations.CTE.NBFPT_$LI$()[devCounter - 1], ini.XNFT[devCounter - 1] + genr * 0.8);
                    ini.RCNF[devCounter - 1] = ini.XNFT[devCounter - 1] - xx;
                    ini.TRCNF += ini.RCNF[devCounter - 1];
                } catch(iaobe) {
                    console.info("IndexArrayOutOfBoundsException    1 ");
                }
            };}
            ini.TNF += ini.TRCNF;
            let ptnlvs: number = 0.0;
            let ptnstm: number = 0.0;
            let ptnfrt: number = 0.0;
            for(let i: number = 1; i <= ini.NBRU; ++i) {{
                try {
                    if (ini.AGLS[i - 1] === -1.0E-11){
                        ini.PLE[i - 1] = 0.0;
                        ini.PGL[i - 1] = 0.0;
                    } else {
                        ini.AGLS[i - 1] = Math.min(1.0, ini.AGLS[i - 1] + iRDVLV);
                        const xbox: number = 100.0 * ini.AGLS[i - 1];
                        if (i === 1){
                            ini.PLE[i - 1] = iTEMFAC * Math.max(0.0, greenhouse.computations.Interpol.interpolatePOL(xbox)) * 10.0;
                        } else {
                            ini.PLE[i - 1] = iTEMFAC * Math.max(0.0, greenhouse.computations.Interpol.interpolatePOL(xbox)) / 0.333;
                        }
                        if (co2 !== 350){
                            ini.PLE[i - 1] *= greenhouse.computations.CorrFactors.sCO2(co2);
                        }
                    }
                    ini.PGL[i - 1] = ini.PLE[i - 1] * 1.43 / 0.022;
                    ini.PGS[i - 1] = ini.PGL[i - 1] * 0.33;
                    ptnlvs += ini.PGL[i - 1];
                    ptnstm += ini.PGL[i - 1] * 0.33;
                    for(let j: number = 1; j <= Math.floor(ini.XNFT[i - 1]); ++j) {{
                        ini.AGF[i - 1][j - 1] = Math.min(1.0, ini.AGF[i - 1][j - 1] + iRDVFR);
                        const ybox: number = 100.0 * ini.AGF[i - 1][j - 1];
                        if (ini.DWF[i - 1][j - 1] < 0.0){
                            ini.PGF[i - 1][j - 1] = 0.0;
                        } else {
                            ini.PGF[i - 1][j - 1] = iTEMFAC * Math.max(0.0, greenhouse.computations.Interpol.interpolatePOF(ybox));
                        }
                        ptnfrt += ini.PGF[i - 1][j - 1];
                    };}
                } catch(aioobe) {
                    console.info("ArrayIndexOutOfBoundsException hier");
                }
            };}
            ini.leavesDemand = ptnlvs;
            ini.stemsDemand = ptnstm;
            return ptnlvs + ptnstm + (ini.fruitsDemand = ptnfrt);
        }
    }
    //Devrate6["__class"] = "greenhouse.computations.Devrate6";

}
export namespace greenhouse.computations {
    export class Dmrate {
        public static dmrate(ini: greenhouse.computations.Init, iGP: number): number {
            ini.TDML = 0.0;
            ini.TDML2 = 0.0;
            ini.DMGL = 0.0;
            ini.TDMS = 0.0;
            ini.TDMF = 0.0;
            ini.DMGF = 0.0;
            ini.TNMF = 0.0;
            ini.DMMF = 0.0;
            ini.PLAR = 0.0;
            ini.PLAR2 = 0.0;
            let ascspL: number = 0.0;
            let ascspS: number = 0.0;
            let ascspF: number = 0.0;
            let ascsp: number = 0.0;
            for(let dmCounter: number = 1; dmCounter <= ini.NBRU; ++dmCounter) {{
                try {
                    const ascL: number = Math.min(ini.PGL[dmCounter - 1], ini.PGL[dmCounter - 1] * ini.SOSIR);
                    ascspL += ascL;
                    ini.DWL[dmCounter - 1] += ascL;
                    if (ini.AGLS[dmCounter - 1] < 1.0){
                        ini.DMGL += ini.DWL[dmCounter - 1];
                    }
                    ini.XLA[dmCounter - 1] += Math.min(ini.PLE[dmCounter - 1], ascL * 0.06 / 1.43);
                    ini.TDML += ini.DWL[dmCounter - 1];
                    ini.PLAR += ini.XLA[dmCounter - 1];
                    if (ini.AGLS[dmCounter - 1] > 0.0){
                        ini.PLAR2 += ini.XLA[dmCounter - 1];
                        ini.TDML2 += ini.DWL[dmCounter - 1];
                    }
                    const ascS: number = Math.min(ini.PGS[dmCounter - 1], ini.PGS[dmCounter - 1] * ini.SOSIR);
                    ascspS += ascS;
                    ini.DWS[dmCounter - 1] += ascS;
                    ini.TDMS += ini.DWS[dmCounter - 1];
                    let ascF: number = 0.0;
                    ini.DWTR[dmCounter - 1] = 0.0;
                    for(let nft: number = (<number>Math.floor(ini.XNFT[dmCounter - 1])|0), dmCounter2: number = 1; dmCounter2 <= nft; ++dmCounter2) {{
                        if (ini.AGF[dmCounter - 1][dmCounter2 - 1] < 1.0 && ini.DWF[dmCounter - 1][dmCounter2 - 1] >= 0.0){
                            ascF = Math.min(ini.PGF[dmCounter - 1][dmCounter2 - 1], ini.PGF[dmCounter - 1][dmCounter2 - 1] * ini.SOSIR);
                            ascspF += ascF;
                            ini.DWF[dmCounter - 1][dmCounter2 - 1] += ascF;
                        }
                        if (ini.DWF[dmCounter - 1][dmCounter2 - 1] > 0.0){
                            ini.DWTR[dmCounter - 1] += ini.DWF[dmCounter - 1][dmCounter2 - 1];
                        }
                        if (ini.AGF[dmCounter - 1][dmCounter2 - 1] === 1.0 && ini.DWF[dmCounter - 1][dmCounter2 - 1] > 0.0){
                            ini.DMMF += ini.DWF[dmCounter - 1][dmCounter2 - 1];
                            ++ini.TNMF;
                        }
                        if (ini.AGF[dmCounter - 1][dmCounter2 - 1] < 1.0 && ini.DWF[dmCounter - 1][dmCounter2 - 1] > 0.0){
                            ini.DMGF += ini.DWF[dmCounter - 1][dmCounter2 - 1];
                        }
                    };}
                    if (ini.AGF[dmCounter - 1][(<number>greenhouse.computations.CTE.NBFPT_$LI$()[dmCounter - 1]|0) - 1] >= 1.0){
                        ini.AGLS[dmCounter - 1] = -1.0E-11;
                    }
                    ini.TDMF += ini.DWTR[dmCounter - 1];
                } catch(aiobe) {
                    console.info("index excep");
                }
            };}
            ascsp = ascspL + ascspS + ascspF;
            ini.CPOOL = Math.max(0.0, (ini.RCDRW - ascsp) / 0.75);
            const cpoolmx: number = 0.06 * ini.TDML / 1.0725;
            if (ini.CPOOL > cpoolmx){
                iGP -= ini.CPOOL - cpoolmx;
                ini.CPOOL = cpoolmx;
            }
            return iGP;
        }
    }
    //Dmrate["__class"] = "greenhouse.computations.Dmrate";

}
export namespace greenhouse.computations {
    export class Init {
        public xcoo: number;

        public ycoo: number;

        TABF: number;

        TNSF: number;

        TNF: number;

        DWL: number[];

        DWS: number[];

        DWTR: number[];

        PLAR2: number;

        XLA: number[];

        ABOR: number[];

        XNFT: number[];

        AGLS: number[];

        PLE: number[];

        PGS: number[];

        PGL: number[];

        PGF: number[][]=[];

        DWF: number[][]=[];

        AGF: number[][]=[];

        ABNF: number[];

        NSF: number[];

        RCNF: number[];

        PLAR: number;

        PLSTN: number;

        NBRU: number;

        NBRUP: number;

        NBLV: number;

        TRCNF: number;

        CPOOL: number;

        public TDML: number;

        public TDML2: number;

        public TDMS: number;

        public TDMF: number;

        TNMF: number;

        DMGF: number;

        DMGL: number;

        DMMF: number;

        stemsDemand: number=0;

        leavesDemand: number=0;

        fruitsDemand: number=0;

        DEMAND: number=0;

        RCDRW: number=0;

        SOSIR: number=0;

        public general(sDAY: number, sMONTH: number, eDAY: number, eMONTH: number, cOtwo: number, nitro: number) {
            const day1: number = greenhouse.computations.Date.dateToInt(sDAY, sMONTH);
            const day2: number = greenhouse.computations.Date.dateToInt(eDAY, eMONTH);
            const NSTART: number = day1;
            let NDAYS: number;
            if (day2 >= day1){
                NDAYS = day2 - day1;
            } else {
                NDAYS = 365 - day1 + day2;
            }
            for(let counter: number = NSTART; counter < NSTART + NDAYS; ++counter) {{
                let jday: number = counter % 365;
                if (jday === 0){
                    jday = 365;
                }
                let GP: number = 0.0;
                let TEMFAC: number = 0.0;
                let RMAINT: number = 0.0;
                let RDVLV: number = 0.0;
                let RDVFR: number = 0.0;
                for(let jhour: number = 1; jhour <= 24; ++jhour) {{
                    const temperature: number = greenhouse.computations.Regulation.getInsideTemp(jday, jhour, this.xcoo);
                    const pPFD: number = greenhouse.computations.Regulation.getInsideLight(jday, jhour, this.xcoo, this.ycoo);
                    const hourTemfac: number = greenhouse.computations.Interpol.interpolateGENTEM(temperature);
                    TEMFAC += hourTemfac * 0.041666666666666664;
                    const hourRMAINT: number = greenhouse.computations.CarbonSupply.respiration(temperature, this.TDML2, this.TDMS, this.DMGF);
                    RMAINT += hourRMAINT * 0.041666666666666664;
                    const hourRdvlv: number = greenhouse.computations.Interpol.interpolateRDVLVT(temperature);
                    RDVLV += hourRdvlv * 0.041666666666666664;
                    const hourRdvfr: number = greenhouse.computations.Interpol.interpolateRDVFRT(temperature);
                    RDVFR += hourRdvfr * 0.041666666666666664;
                    const hourGP: number = greenhouse.computations.CarbonSupply.photosynthesis(cOtwo, temperature, pPFD, this);
                    GP += hourGP * 0.041666666666666664;
                };}
                const reductionCoor: number = 0.7952105 + 0.1892599 * Math.log(0.1 + nitro / 2.0);
                GP *= reductionCoor;
                this.DEMAND = greenhouse.computations.Devrate6.devrate6(jday, cOtwo, this, RDVLV, TEMFAC, RDVFR);
                this.RCDRW = 0.75 * (GP + this.CPOOL - RMAINT);
                if (this.RCDRW < 0.0){
                    this.RCDRW = 0.0;
                    RMAINT = GP + this.CPOOL;
                }
                this.RCDRW *= 1.0 - greenhouse.computations.Interpol.interpolatePROOT(this.PLSTN);
                this.SOSIR = Math.min(1.0, this.RCDRW / (this.DEMAND + 1.0E-11));
                const GRESP: number = (GP + this.CPOOL - RMAINT) * 0.15625;
                greenhouse.computations.Losrate.losrate(this);
                GP = greenhouse.computations.Dmrate.dmrate(this, GP);
            };}
        }

        public constructor(nodenumber: number, dryweightleaves: number, leafarea: number, dryweightstem: number, x: number, y: number) {
            this.TABF = 0.0;
            this.TNSF = 0.0;
            this.TNF = 0.0;
            this.DWL = (s => { let a:number[]=[]; while(s-->0) a.push(0); return a; })(100);
            this.DWS = (s => { let a:number[]=[]; while(s-->0) a.push(0); return a; })(100);
            this.DWTR = (s => { let a:number[]=[]; while(s-->0) a.push(0); return a; })(100);
            this.PLAR2 = 0.0;
            this.XLA = (s => { let a:number[]=[]; while(s-->0) a.push(0); return a; })(100);
            this.ABOR = (s => { let a:number[]=[]; while(s-->0) a.push(0); return a; })(100);
            this.XNFT = (s => { let a:number[]=[]; while(s-->0) a.push(0); return a; })(100);
            this.AGLS = (s => { let a:number[]=[]; while(s-->0) a.push(0); return a; })(100);
            this.PLE = (s => { let a:number[]=[]; while(s-->0) a.push(0); return a; })(100);
            this.PGS = (s => { let a:number[]=[]; while(s-->0) a.push(0); return a; })(100);
            this.PGL = (s => { let a:number[]=[]; while(s-->0) a.push(0); return a; })(100);
            for(let i=0;i<100;i++){
                this.PGF.push([]);
                for(let j=0;j<7;j++){
                    this.PGF[i].push(0);
                }
            }
            //this.PGF = <any> (function(dims) { let allocate = function(dims:number[]) { if (dims.length === 0) { return 0; } else { let array:number[][] = []; for(let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([100, 7]);
            this.ABNF = (s => { let a:number[]=[]; while(s-->0) a.push(0); return a; })(100);
            this.NSF = (s => { let a:number[]=[]; while(s-->0) a.push(0); return a; })(100);
            this.RCNF = (s => { let a:number[]=[]; while(s-->0) a.push(0); return a; })(100);
            this.NBRU = 0;
            this.NBRUP = 0;
            this.NBLV = 0;
            this.TRCNF = 0.0;
            this.TDMF = 0.0;
            this.TNMF = 0.0;
            this.DMGF = 0.0;
            this.DMMF = 0.0;
            this.xcoo = x;
            this.ycoo = y;
            this.DWL[0] = dryweightleaves;
            this.DWS[0] = dryweightstem;
            this.DWTR[0] = 0.0;
            this.PLAR = leafarea;
            this.XLA[0] = this.PLAR;
            this.ABOR[0] = 0.0;
            this.XNFT[0] = 0.0;
            this.AGLS[0] = 0.15;
            this.RCNF[0] = 0.0;
            this.PLE[0] = 0.0;
            this.PGS[0] = 0.0;
            this.PGL[0] = 0.0;
            this.ABNF[0] = 0.0;
            this.NSF[0] = 0;
            for(let i: number = 1; i < 100; ++i) {{
                this.DWL[i] = 0.0;
                this.DWS[i] = 0.0;
                this.AGLS[i] = 0.0;
                this.ABOR[i] = 0.0;
                this.XNFT[i] = 0.0;
                this.DWTR[i] = 0.0;
                this.RCNF[i] = 0.0;
                this.PLE[i] = 0.0;
                this.PGS[i] = 0.0;
                this.PGL[i] = 0.0;
                this.ABNF[i] = 0.0;
                this.NSF[i] = 0;
            };}
            for(let i=0;i<100;i++){
                this.DWF.push([]);
                for(let j=0;j<7;j++){
                    this.DWF[i].push(0);
                }
            }
            for(let i=0;i<100;i++){
                this.AGF.push([]);
                for(let j=0;j<7;j++){
                    this.AGF[i].push(0);
                }
            }
            //this.DWF = <any> (function(dims) { let allocate = function(dims) { if (dims.length === 0) { return 0; } else { let array = []; for(let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([100, 7]);
            //this.AGF = <any> (function(dims) { let allocate = function(dims) { if (dims.length === 0) { return 0; } else { let array = []; for(let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([100, 7]);
            for(let i: number = 0; i < 100; ++i) {{
                for(let j: number = 0; j < 7; ++j) {{
                    this.DWF[i][j] = 0.0;
                    this.AGF[i][j] = 0.0;
                    this.PGF[i][j] = 0.0;
                };}
            };}
            this.PLSTN = nodenumber;
            this.DMGL = dryweightleaves;
            this.CPOOL = 0.1 * dryweightleaves;
            this.TDML = dryweightleaves;
            this.TDML2 = 0.0;
            this.TDMS = dryweightstem;
        }

        public getWeight(): number {
            return this.TDMF + this.TDML + this.TDMS + this.CPOOL;
        }
    }
    //Init["__class"] = "greenhouse.computations.Init";

}
export namespace greenhouse.computations {
    export class Interpol {
        static __static_initialized: boolean = false;
        static __static_initialize() { if (!Interpol.__static_initialized) { Interpol.__static_initialized = true; Interpol.__static_initializer_0(); } }

        public static PGRED: number[]; public static PGRED_$LI$(): number[] { Interpol.__static_initialize();  return Interpol.PGRED; }

        public static TMPG: number[]; public static TMPG_$LI$(): number[] { Interpol.__static_initialize();  return Interpol.TMPG; }

        public static GENTEM: number[]; public static GENTEM_$LI$(): number[] { Interpol.__static_initialize();  return Interpol.GENTEM; }

        public static XTEM: number[]; public static XTEM_$LI$(): number[] { Interpol.__static_initialize();  return Interpol.XTEM; }

        public static GENRAT: number[]; public static GENRAT_$LI$(): number[] { Interpol.__static_initialize();  return Interpol.GENRAT; }

        public static XGEN: number[]; public static XGEN_$LI$(): number[] { Interpol.__static_initialize();  return Interpol.XGEN; }

        public static RDVLVT: number[]; public static RDVLVT_$LI$(): number[] { Interpol.__static_initialize();  return Interpol.RDVLVT; }

        public static XLV: number[]; public static XLV_$LI$(): number[] { Interpol.__static_initialize();  return Interpol.XLV; }

        public static RDVFRT: number[]; public static RDVFRT_$LI$(): number[] { Interpol.__static_initialize();  return Interpol.RDVFRT; }

        public static XFR: number[]; public static XFR_$LI$(): number[] { Interpol.__static_initialize();  return Interpol.XFR; }

        public static PROOT: number[]; public static PROOT_$LI$(): number[] { Interpol.__static_initialize();  return Interpol.PROOT; }

        public static XROOT: number[]; public static XROOT_$LI$(): number[] { Interpol.__static_initialize();  return Interpol.XROOT; }

        public static BOX: number[]; public static BOX_$LI$(): number[] { Interpol.__static_initialize();  return Interpol.BOX; }

        public static POL: number[]; public static POL_$LI$(): number[] { Interpol.__static_initialize();  return Interpol.POL; }

        public static POF: number[]; public static POF_$LI$(): number[] { Interpol.__static_initialize();  return Interpol.POF; }

        public static interpolatePGRED(temp: number): number {
            let small: boolean = true;
            let counter: number = 0;
            let result: number;
            if (temp < 50.0){
                while((small)) {{
                    if (temp >= Interpol.TMPG_$LI$()[counter]){
                        ++counter;
                    } else {
                        small = false;
                    }
                }};
                const width: number = Interpol.TMPG_$LI$()[counter] - Interpol.TMPG_$LI$()[counter - 1];
                const hight: number = Interpol.PGRED_$LI$()[counter] - Interpol.PGRED_$LI$()[counter - 1];
                const rico: number = hight / width;
                result = Interpol.PGRED_$LI$()[counter - 1] + rico * (temp - Interpol.TMPG_$LI$()[counter - 1]);
            } else {
                result = 0.0;
            }
            return result;
        }

        public static interpolateRDVLVT(temp: number): number {
            let small: boolean = true;
            let counter: number = 0;
            let result: number;
            if (temp < 80.0){
                while((small)) {{
                    if (temp >= Interpol.XLV_$LI$()[counter]){
                        ++counter;
                    } else {
                        small = false;
                    }
                }};
                const width: number = Interpol.XLV_$LI$()[counter] - Interpol.XLV_$LI$()[counter - 1];
                const hight: number = Interpol.RDVLVT_$LI$()[counter] - Interpol.RDVLVT_$LI$()[counter - 1];
                const rico: number = hight / width;
                result = Interpol.RDVLVT_$LI$()[counter - 1] + rico * (temp - Interpol.XLV_$LI$()[counter - 1]);
            } else {
                result = 0.0;
            }
            return result;
        }

        public static interpolatePROOT(plstnMethod: number): number {
            let small: boolean = true;
            let counter: number = 0;
            let result: number;
            if (plstnMethod < 90.0){
                while((small)) {{
                    if (plstnMethod >= Interpol.XROOT_$LI$()[counter]){
                        ++counter;
                    } else {
                        small = false;
                    }
                }};
                const width: number = Interpol.XROOT_$LI$()[counter] - Interpol.XROOT_$LI$()[counter - 1];
                const hight: number = Interpol.PROOT_$LI$()[counter] - Interpol.PROOT_$LI$()[counter - 1];
                const rico: number = hight / width;
                result = Interpol.PROOT_$LI$()[counter - 1] + rico * (plstnMethod - Interpol.XROOT_$LI$()[counter - 1]);
            } else {
                result = 0.02;
            }
            return result;
        }

        public static interpolatePOF(xboxMethod: number): number {
            let small: boolean = true;
            let counter: number = 0;
            let result: number;
            if (xboxMethod < 100.0){
                while((small)) {{
                    if (xboxMethod >= Interpol.BOX_$LI$()[counter]){
                        ++counter;
                    } else {
                        small = false;
                    }
                }};
                const width: number = Interpol.BOX_$LI$()[counter] - Interpol.BOX_$LI$()[counter - 1];
                const hight: number = Interpol.POF_$LI$()[counter] - Interpol.POF_$LI$()[counter - 1];
                const rico: number = hight / width;
                result = Interpol.POF_$LI$()[counter - 1] + rico * (xboxMethod - Interpol.BOX_$LI$()[counter - 1]);
            } else {
                result = 0.0;
            }
            return result;
        }

        public static interpolateGENTEM(temp: number): number {
            let small: boolean = true;
            let counter: number = 0;
            let result: number;
            if (temp < 50.0){
                while((small)) {{
                    if (temp >= Interpol.XTEM_$LI$()[counter]){
                        ++counter;
                    } else {
                        small = false;
                    }
                }};
                const width: number = Interpol.XTEM_$LI$()[counter] - Interpol.XTEM_$LI$()[counter - 1];
                const hight: number = Interpol.GENTEM_$LI$()[counter] - Interpol.GENTEM_$LI$()[counter - 1];
                const rico: number = hight / width;
                result = Interpol.GENTEM_$LI$()[counter - 1] + rico * (temp - Interpol.XTEM_$LI$()[counter - 1]);
            } else {
                result = 0.0;
            }
            return result;
        }

        static  __static_initializer_0() {
            Interpol.PGRED = [0.0, 0.67, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0];
            Interpol.TMPG = [0.0, 9.0, 12.0, 15.0, 21.0, 28.0, 35.0, 50.0];
            Interpol.GENTEM = [0.0, 0.0, 0.0, 0.55, 1.0, 0.0];
            Interpol.XTEM = [0.0, 5.0, 9.0, 12.0, 28.0, 50.0];
            Interpol.GENRAT = [0.0, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55];
            Interpol.XGEN = [0.0, 5.0, 20.0, 43.0, 48.0, 60.0, 90.0, 200.0];
            Interpol.RDVLVT = [0.0, 0.0, 0.0096, 0.0126, 0.019, 0.026, 0.026, 0.0, 0.0];
            Interpol.XLV = [0.0, 9.0, 12.0, 15.0, 21.0, 28.0, 35.0, 50.0, 80.0];
            Interpol.RDVFRT = [0.0, 0.0, 0.007, 0.016, 0.021, 0.024, 0.022, 0.02, 0.0];
            Interpol.XFR = [0.0, 9.0, 15.0, 18.0, 21.0, 24.0, 28.0, 35.0, 50.0];
            Interpol.PROOT = [0.18, 0.15, 0.12, 0.08, 0.02, 0.02];
            Interpol.XROOT = [1.0, 10.0, 20.0, 30.0, 50.0, 90.0];
            Interpol.BOX = [0.0, 5.0, 15.0, 25.0, 35.0, 45.0, 55.0, 65.0, 75.0, 85.0, 95.0, 100.0];
            Interpol.POL = [0.0, 3.5E-4, 0.00165, 0.00255, 0.0023, 0.00155, 9.0E-4, 5.0E-4, 2.5E-4, 1.5E-4, 5.0E-5, 0.0];
            Interpol.POF = [0.0, 0.09, 0.25, 0.45, 0.57, 0.58, 0.51, 0.41, 0.31, 0.22, 0.11, 0.0];
        }

        public static interpolateGENRAT(plstnMethod: number): number {
            let small: boolean = true;
            let counter: number = 0;
            let result: number;
            if (plstnMethod < 200.0){
                while((small)) {{
                    if (plstnMethod >= Interpol.XGEN_$LI$()[counter]){
                        ++counter;
                    } else {
                        small = false;
                    }
                }};
                const width: number = Interpol.XGEN_$LI$()[counter] - Interpol.XGEN_$LI$()[counter - 1];
                const hight: number = Interpol.GENRAT_$LI$()[counter] - Interpol.GENRAT_$LI$()[counter - 1];
                const rico: number = hight / width;
                result = Interpol.GENRAT_$LI$()[counter - 1] + rico * (plstnMethod - Interpol.XGEN_$LI$()[counter - 1]);
            } else {
                result = 0.55;
            }
            return result;
        }

        public static interpolateRDVFRT(temp: number): number {
            let small: boolean = true;
            let counter: number = 0;
            let result: number;
            if (temp < 50.0){
                while((small)) {{
                    if (temp >= Interpol.XFR_$LI$()[counter]){
                        ++counter;
                    } else {
                        small = false;
                    }
                }};
                const width: number = Interpol.XFR_$LI$()[counter] - Interpol.XFR_$LI$()[counter - 1];
                const hight: number = Interpol.RDVFRT_$LI$()[counter] - Interpol.RDVFRT_$LI$()[counter - 1];
                const rico: number = hight / width;
                result = Interpol.RDVFRT_$LI$()[counter - 1] + rico * (temp - Interpol.XFR_$LI$()[counter - 1]);
            } else {
                result = 0.0;
            }
            return result;
        }

        public static interpolatePOL(xboxMethod: number): number {
            let small: boolean = true;
            let counter: number = 0;
            let result: number;
            if (xboxMethod < 100.0){
                while((small)) {{
                    if (xboxMethod >= Interpol.BOX_$LI$()[counter]){
                        ++counter;
                    } else {
                        small = false;
                    }
                }};
                const width: number = Interpol.BOX_$LI$()[counter] - Interpol.BOX_$LI$()[counter - 1];
                const hight: number = Interpol.POL_$LI$()[counter] - Interpol.POL_$LI$()[counter - 1];
                const rico: number = hight / width;
                result = Interpol.POL_$LI$()[counter - 1] + rico * (xboxMethod - Interpol.BOX_$LI$()[counter - 1]);
            } else {
                result = 0.0;
            }
            return result;
        }
    }
    //Interpol["__class"] = "greenhouse.computations.Interpol";

}
export namespace greenhouse.computations {
    export class Losrate {
        public static ABORMX: number = 0.73;

        public static losrate(ini: greenhouse.computations.Init) {
            let tabnf: number = 0.0;
            if (ini.TDMF >= 1.0E-11){
                let fabor: number = Math.min(1.0, 0.67 - 0.73 * ini.SOSIR);
                fabor = Math.max(0.0, fabor);
                tabnf = fabor * ini.TRCNF;
            }
            ini.TABF += tabnf;
            ini.TNSF = ini.TNF - ini.TABF;
            let b: number = 0.0;
            try {
                for(let losCounter: number = 1; losCounter <= ini.NBRUP; ++losCounter) {{
                    if (ini.RCNF[losCounter - 1] !== 0.0 && ini.XNFT[losCounter - 1] > 2.0 && b < tabnf){
                        ini.ABNF[losCounter - 1] = Math.min(4.0, ini.RCNF[losCounter - 1]);
                        ini.ABNF[losCounter - 1] = Math.min(ini.ABNF[losCounter - 1], tabnf - b);
                        ini.ABNF[losCounter - 1] = Math.min(ini.ABNF[losCounter - 1], ini.XNFT[losCounter - 1] - 2.0 - ini.ABOR[losCounter - 1]);
                        ini.ABNF[losCounter - 1] = Math.max(0.0, ini.ABNF[losCounter - 1]);
                        b += ini.ABNF[losCounter - 1];
                        ini.ABOR[losCounter - 1] += ini.ABNF[losCounter - 1];
                        ini.NSF[losCounter - 1] = (<number>Math.floor(ini.XNFT[losCounter - 1] - ini.ABOR[losCounter - 1])|0);
                        if (ini.ABOR[losCounter - 1] >= 1.0){
                            for(let j: number = ini.NSF[losCounter - 1] + 1; j <= (<number>Math.floor(ini.XNFT[losCounter - 1])|0); ++j) {{
                                ini.DWF[losCounter - 1][j - 1] = -1.0E-11;
                            };}
                        }
                    }
                };}
            } catch(aiob) {
                console.info("array indeyout of ");
            }
        }
    }
    //Losrate["__class"] = "greenhouse.computations.Losrate";

}
export namespace greenhouse.computations {
    export class MetroLogicalData {
        static __static_initialized: boolean = false;
        static weatherMatrix: number[][][]=[];
        public static weatherMatrix_$LI$(): number[][][] { MetroLogicalData.__static_initialize();  return MetroLogicalData.weatherMatrix; }
        static __static_initialize() { if (!MetroLogicalData.__static_initialized) { MetroLogicalData.__static_initialized = true; MetroLogicalData.__static_initializer_0(); } }

        

        public static readMetroLogicalData(filename: string) {
            return;
            /**const url: java.net.URL = MetroLogicalData.getResource(filename);
            if (url == null){
                console.info("Resource not found: " + filename);
                return;
            }
            try {
                const is: java.io.InputStream = url.openStream();
                const __in: java.io.BufferedReader = new java.io.BufferedReader(new java.io.InputStreamReader(is));
                for(let i: number = 0; i < 365; ++i) {{
                    for(let j: number = 0; j < 24; ++j) {{
                        const lijn: string = __in.readLine();
                        const dagS: string = lijn.substring(0, 4);
                        const uurS: string = lijn.substring(4, 8);
                        const lichtS: string = lijn.substring(8, 14);
                        const tempS: string = lijn.substring(14, 19);
                        const dag: number = javaemul.internal.IntegerHelper.parseInt(dagS.trim());
                        const uur: number = javaemul.internal.IntegerHelper.parseInt(uurS.trim());
                        const licht: number = javaemul.internal.IntegerHelper.parseInt(lichtS.trim());
                        const temp: number = javaemul.internal.IntegerHelper.parseInt(tempS.trim());
                        if (dag === i + 1 && uur === j + 1){
                            MetroLogicalData.weatherMatrix_$LI$()[i][j][0] = licht;
                            MetroLogicalData.weatherMatrix_$LI$()[i][j][1] = temp;
                        } else {
                            console.info("The given file does not have the specified format");
                        }
                    };}
                };}
                __in.close();
            } catch(ioe) {
                console.info("IOException");
                console.info(ioe);
            }**/
        }

        public static getLight(day: number, hour: number): number {
            const index1: number = day - 1;
            const index2: number = hour - 1;
            return MetroLogicalData.weatherMatrix_$LI$()[index1][index2][0];
        }

        static  __static_initializer_0() {
            for(let i=0;i<365;i++){
                MetroLogicalData.weatherMatrix.push([])
                for(let j=0;j<24;j++){
                    MetroLogicalData.weatherMatrix[i].push([]); 
                    for(let q=0;q<2;q++){
                        MetroLogicalData.weatherMatrix[i][j].push(0); 
                    }
                }
            }
            //MetroLogicalData.weatherMatrix = <any> (function(dims) { let allocate:(dims:number[])=>(0|number[][][]) = function(dims:number[]) { if (dims.length === 0) { return 0; } else { let array = []; for(let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([365, 24, 2]);
        }

        public static getTemp(day: number, hour: number): number {
            const index1: number = day - 1;
            const index2: number = hour - 1;
            return MetroLogicalData.weatherMatrix_$LI$()[index1][index2][1];
        }
    }
    //MetroLogicalData["__class"] = "greenhouse.computations.MetroLogicalData";

}
export namespace greenhouse.computations {
    export class Regulation {
        public static TRGH: number = 0.65;

        public static getInsideLight(day: number, hour: number, xPosition: number, yPosition: number): number {
            const lightStrength: number = 400.0;
            let night: boolean = true;
            const minDayLight: number = 400.0;
            let xxx: number;
            if (xPosition <= 4.0){
                xxx = xPosition - 2.0;
            } else {
                xxx = xPosition - 6.0;
            }
            let yyy: number;
            if (yPosition <= 4.0){
                yyy = yPosition - 2.0;
            } else {
                yyy = yPosition - 6.0;
            }
            const lightFactor: number = Math.exp(-1.0 * xxx * xxx - yyy * yyy);
            const extraLight: number = lightFactor * lightStrength * 0.3 / 3.11227;
            if (hour > 8 && hour <= 20){
                night = false;
            }
            const lightOut: number = greenhouse.computations.MetroLogicalData.getLight(day, hour);
            const lightIn: number = lightOut * 0.65;
            let lightReg: number;
            if (!night){
                if (lightIn < minDayLight){
                    lightReg = lightIn + extraLight;
                } else {
                    lightReg = lightIn;
                }
            } else {
                lightReg = lightIn;
            }
            lightReg = lightReg * 0.47 * 4.57;
            return lightReg;
        }

        public static getInsideTemp(day: number, hour: number, xPosition: number): number {
            const minDayTemp: number = 18.0;
            const minNightTemp: number = 15.0;
            const tempDif: number = 3.0;
            let night: boolean = true;
            let tempReg: number = 0.0;
            const positionFactor: number = xPosition * xPosition / 16.0 - xPosition / 2.0 + 1.0;
            const tempOut: number = greenhouse.computations.MetroLogicalData.getTemp(day, hour);
            if (hour > 8 && hour <= 20){
                night = false;
            }
            if (night){
                if (tempOut < minNightTemp){
                    tempReg = minNightTemp + positionFactor * tempDif;
                } else {
                    tempReg = tempOut;
                }
            }
            if (!night){
                if (tempOut < minDayTemp){
                    tempReg = minDayTemp + positionFactor * tempDif;
                } else {
                    tempReg = tempOut;
                }
            }
            return tempReg;
        }
    }
    //Regulation["__class"] = "greenhouse.computations.Regulation";

}


greenhouse.computations.MetroLogicalData.weatherMatrix_$LI$();

greenhouse.computations.MetroLogicalData.__static_initialize();

greenhouse.computations.Interpol.POF_$LI$();

greenhouse.computations.Interpol.POL_$LI$();

greenhouse.computations.Interpol.BOX_$LI$();

greenhouse.computations.Interpol.XROOT_$LI$();

greenhouse.computations.Interpol.PROOT_$LI$();

greenhouse.computations.Interpol.XFR_$LI$();

greenhouse.computations.Interpol.RDVFRT_$LI$();

greenhouse.computations.Interpol.XLV_$LI$();

greenhouse.computations.Interpol.RDVLVT_$LI$();

greenhouse.computations.Interpol.XGEN_$LI$();

greenhouse.computations.Interpol.GENRAT_$LI$();

greenhouse.computations.Interpol.XTEM_$LI$();

greenhouse.computations.Interpol.GENTEM_$LI$();

greenhouse.computations.Interpol.TMPG_$LI$();

greenhouse.computations.Interpol.PGRED_$LI$();

greenhouse.computations.Interpol.__static_initialize();

greenhouse.computations.CTE.NBFPT_$LI$();

greenhouse.computations.CTE.__static_initialize();
console.log("methods called");
