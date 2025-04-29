"use client";
import { useState, useEffect } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function Dossiermedical({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { patientId } = resolvedParams;
  const [openSections, setOpenSections] = useState({});
  const [patient, setPatient] = useState(null);
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    // Patient Information
    fullName: "",
    Age: "",
    service: "",
    address: "",
    dossierNumber: null,
    bloodType: "",
    nir: "",
    familySituation: "",
    meds: "",
    others: "",
    congenitalConditions: "",
    generalDiseases: "",
    medAllergies: "",
    weight: "",
    height: "",
    age: "",
    birthDate: "",

    // Visual Acuity
    visualAcuityOdSc: "",
    visualAcuityOgSc: "",
    visualAcuityOdWc: "",
    visualAcuityOgWc: "",
    auditionOd: "",
    auditionOg: "",

    // Tobacco/Alcohol
    smoker: false,
    cigarettesPerDay: 0,
    chewTobacco: false,
    boxesPerDayChew: 0,
    snuffUser: false,
    boxesPerDaySnuff: 0,
    ageFirstTobaccoUse: 0,
    formerSmoker: false,
    exposurePeriod: "",
    alcoholDetails: "",
    alcohol: false,

    // Skin and Mucous Membranes
    affectationCutanees: false,
    skinExamNotes: "",
    surgical_interventions: "",

    // Ophthalmological
    larmoiement: false,
    douleurs: false,
    taches: false,
    ophExamNotes: "",

    // ORL
    sifflements: false,
    angine: false,
    epistaxis: false,
    rhinorrhee: false,
    autreOrl: "",
    orlExamNotes: "",

    // Locomotor
    musculaires: false,
    articulaires: false,
    vertebrales: false,
    neurological: false,
    movementDifficulty: false,
    fatigability: false,
    locExamNotes: "",

    // Cardiovascular
    palpitation: false,
    oedemes: false,
    aLaMarche: false,
    auRepos: false,
    aEffort: false,
    permanents: false,
    pouls: "",
    ta: "",
    cyanose: "",
    carExamNotes: "",

    // Respiratory
    toux: false,
    dyspneeNocturne: false,
    dyspneeDiurne: false,
    expectorations: "",
    douleursThoraciques: false,
    autreRespiratoire: "",
    respiratoryRate: "",
    resExamNotes: "",

    // Digestive
    pyrosis: false,
    vomissements: false,
    appetit: false,
    appetitDetails: "",
    transit: false,
    transitDetails: "",
    rectalgies: false,
    rectalgiesDetails: "",
    douleurAbdominale: false,
    douleurAbdominaleDetails: "",
    autresDigestif: false,
    autresDigestifDetails: "",
    denture: "",
    gingivorragie: "",
    autresDigestifExamens: "",
    abdomen: "",
    hernie: "",
    foie: "",
    stools: "",

    // Genitourinary
    pollakiuria: false,
    dysuria: false,
    hematuria: false,
    micturitionBurning: false,
    nephriticColic: false,
    losses: "",
    cycles: "",
    genOther: "",
    boursesNotes: "",
    breastsNotes: "",
    trNotes: "",
    tvNotes: "",

    // Neurological
    sleep: "",
    headaches: false,
    vertigo: false,
    agoraphobia: false,
    lossConsciousness: false,
    paresis: false,
    paresthesia: false,
    neuOther: "",
    tremorNotes: "",
    rombergNotes: "",
    reflexesRo: "",
    reflexesAch: "",
    coordinationNotes: "",
    sensitivityNotes: "",
    motricityNotes: "",
    ocularNotes: "",

    // Hematological
    ecchymoses: false,
    bleedingTendency: false,
    petechiaeNotes: "",
    purpuraNotes: "",
    spleenNotes: "",
    ganglionsCervical: "",
    ganglionsAxillary: "",
    ganglionsClavicular: "",
    ganglionsInguinal: "",

    // Endocrine
    familyObesity: false,
    familyThinness: false,
    thyroidNotes: "",
    testiclesNotes: "",
    mammaryNotes: "",

    // Psychological
    psychologicalProfile: "",

    // Functional Exploration
    expFuncRespiratory: "",
    expFuncCirculatory: "",
    expFuncMotor: "",

    // Complementary Exams
    examCompRadiological: "",
    examCompBioBlood: "",
    examCompBioUrinary: "",
    examCompHepViral: "",
    examCompSyphilis: "",
    examCompHiv: "",

    // EPS
    epsApt: false,
    epsMotifs: "",
    orientationSpecialist: "",
    orientationOpinion: false,
    orientationHospitalization: false,
    orientationTreatment: false,
    orientationResponse: "",
  });
  const [error, setError] = useState(null);

  const toggleSection = (label) => {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  useEffect(() => {
    if (!patientId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [medicalRecordRes] = await Promise.all([
          api.get(`/api/medical-records/${patientId}`),
        ]);

        if (medicalRecordRes.data) {
          setMedicalRecord(medicalRecordRes.data);
          setPatient(medicalRecordRes.data.patient);
          setFormData({
            fullName: `${medicalRecordRes.data.patient.firstName} ${medicalRecordRes.data.patient.familyName}`,
            Age: medicalRecordRes.data.patient.age || "No DATA",
            service: medicalRecordRes.data["medical-record"]?.study_field || "",
            address: medicalRecordRes.data["medical-record"]?.address || "",
            dossierNumber:
              medicalRecordRes.data["medical-record"]?.dossier_number || null,
            bloodType:
              medicalRecordRes.data["medical-record"]?.blood_group || "",
            nir:
              medicalRecordRes.data["medical-record"]?.social_security_number ||
              "",
            familySituation:
              medicalRecordRes.data["medical-record"]?.family_situation || "",
            meds:
              medicalRecordRes.data["medical-record"]?.medication_details || "",
            others:
              medicalRecordRes.data["medical-record"]?.other_intoxications ||
              "",
            congenitalConditions:
              medicalRecordRes.data["medical-record"]?.congenital_conditions ||
              "",
            generalDiseases:
              medicalRecordRes.data["medical-record"]?.general_diseases || "",
            medAllergies:
              medicalRecordRes.data["medical-record"]?.medication_allergies ||
              "",
            weight: medicalRecordRes.data["medical-record"]?.weight_kg
              ? `${medicalRecordRes.data["medical-record"].weight_kg}`
              : "",
            height: medicalRecordRes.data["medical-record"]?.height_cm
              ? `${medicalRecordRes.data["medical-record"].height_cm}`
              : "",
            age: medicalRecordRes.data.patient.age || "",

            // Visual Acuity
            visualAcuityOdSc:
              medicalRecordRes.data["medical-record"]?.visual_acuity_od_sc ||
              "",
            visualAcuityOgSc:
              medicalRecordRes.data["medical-record"]?.visual_acuity_og_sc ||
              "",
            visualAcuityOdWc:
              medicalRecordRes.data["medical-record"]?.visual_acuity_od_wc ||
              "",
            visualAcuityOgWc:
              medicalRecordRes.data["medical-record"]?.visual_acuity_og_wc ||
              "",
            auditionOd:
              medicalRecordRes.data["medical-record"]?.audition_od || "",
            auditionOg:
              medicalRecordRes.data["medical-record"]?.audition_og || "",

            // Tobacco/Alcohol
            smoker: medicalRecordRes.data["medical-record"]?.smoker || false,
            cigarettesPerDay:
              medicalRecordRes.data["medical-record"]?.cigarettes_per_day || 0,
            chewTobacco:
              medicalRecordRes.data["medical-record"]?.chewer || false,
            boxesPerDayChew:
              medicalRecordRes.data["medical-record"]?.boxes_per_day_chew || 0,
            snuffUser:
              medicalRecordRes.data["medical-record"]?.snuff_user || false,
            boxesPerDaySnuff:
              medicalRecordRes.data["medical-record"]?.boxes_per_day_snuff || 0,
            ageFirstTobaccoUse:
              medicalRecordRes.data["medical-record"]?.age_first_tobacco_use ||
              0,
            formerSmoker:
              medicalRecordRes.data["medical-record"]?.former_smoker || false,
            exposurePeriod:
              medicalRecordRes.data["medical-record"]?.exposure_period || "",
            alcoholDetails:
              medicalRecordRes.data["medical-record"]?.alcohol_details || "",

            // Medical Examination
            // Skin and Mucous Membranes
            affectationCutanees:
              medicalRecordRes.data["medical-record"]?.skin_conditions || false,
            skinExamNotes:
              medicalRecordRes.data["medical-record"]?.skin_exam_notes || "",
            surgical_interventions:
              medicalRecordRes.data["medica-record"]?.surgical_interventions ||
              "",
            // Ophthalmological
            larmoiement:
              medicalRecordRes.data["medical-record"]?.oph_tearing || false,
            douleurs:
              medicalRecordRes.data["medical-record"]?.oph_pain || false,
            taches: medicalRecordRes.data["medical-record"]?.oph_spots || false,
            ophExamNotes:
              medicalRecordRes.data["medical-record"]?.oph_exam_notes || "",

            // ORL
            sifflements:
              medicalRecordRes.data["medical-record"]?.orl_tinnitus || false,
            angine:
              medicalRecordRes.data["medical-record"]?.orl_repeated_angina ||
              false,
            epistaxis:
              medicalRecordRes.data["medical-record"]?.orl_epistaxis || false,
            rhinorrhee:
              medicalRecordRes.data["medical-record"]?.orl_rhinorrhea || false,
            autreOrl: medicalRecordRes.data["medical-record"]?.orl_other || "",
            orlExamNotes:
              medicalRecordRes.data["medical-record"]?.orl_exam_notes || "",

            // Locomotor
            musculaires:
              medicalRecordRes.data["medical-record"]?.loc_pain_muscular ||
              false,
            articulaires:
              medicalRecordRes.data["medical-record"]?.loc_pain_articular ||
              false,
            vertebrales:
              medicalRecordRes.data["medical-record"]?.loc_pain_vertebral ||
              false,
            neurological:
              medicalRecordRes.data["medical-record"]?.loc_pain_neurological ||
              false,
            movementDifficulty:
              medicalRecordRes.data["medical-record"]
                ?.loc_movement_difficulty || false,
            fatigability:
              medicalRecordRes.data["medical-record"]?.loc_fatigability ||
              false,
            locExamNotes:
              medicalRecordRes.data["medical-record"]?.loc_exam_notes || "",

            // Cardiovascular
            palpitation:
              medicalRecordRes.data["medical-record"]?.car_palpitations ||
              false,
            oedemes:
              medicalRecordRes.data["medical-record"]?.car_edema || false,
            aLaMarche:
              medicalRecordRes.data["medical-record"]?.car_pain_walking ||
              false,
            auRepos:
              medicalRecordRes.data["medical-record"]?.car_pain_rest || false,
            aEffort:
              medicalRecordRes.data["medical-record"]?.car_pain_effort || false,
            permanents:
              medicalRecordRes.data["medical-record"]?.car_pain_permanent ||
              false,
            pouls: medicalRecordRes.data["medical-record"]?.pulse_rate || "",
            ta: medicalRecordRes.data["medical-record"]?.blood_pressure || "",
            cyanose: medicalRecordRes.data["medical-record"]?.cyanosis
              ? "Yes"
              : "No",
            carExamNotes:
              medicalRecordRes.data["medical-record"]?.car_exam_notes || "",

            // Respiratory
            toux: medicalRecordRes.data["medical-record"]?.res_cough || false,
            dyspneeNocturne:
              medicalRecordRes.data["medical-record"]?.res_dyspnea_nocturnal ||
              false,
            dyspneeDiurne:
              medicalRecordRes.data["medical-record"]?.res_dyspnea_diurnal ||
              false,
            expectorations:
              medicalRecordRes.data["medical-record"]?.res_expectorations || "",
            douleursThoraciques:
              medicalRecordRes.data["medical-record"]?.res_thoracic_pain ||
              false,
            autreRespiratoire:
              medicalRecordRes.data["medical-record"]?.res_other || "",
            respiratoryRate:
              medicalRecordRes.data["medical-record"]?.respiratory_rate || "",
            resExamNotes:
              medicalRecordRes.data["medical-record"]?.res_exam_notes || "",

            // Digestive
            pyrosis:
              medicalRecordRes.data["medical-record"]?.dig_pyrosis || false,
            vomissements:
              medicalRecordRes.data["medical-record"]?.dig_vomiting || false,
            appetitDetails:
              medicalRecordRes.data["medical-record"]?.dig_appetite || "",
            transitDetails:
              medicalRecordRes.data["medical-record"]?.dig_transit || "",
            rectalgiesDetails:
              medicalRecordRes.data["medical-record"]?.dig_rectorrhagia || "",
            douleurAbdominaleDetails:
              medicalRecordRes.data["medical-record"]?.dig_abdominal_pain ||
              false,
            autresDigestifDetails:
              medicalRecordRes.data["medical-record"]?.dig_other || "",
            denture:
              medicalRecordRes.data["medical-record"]?.dig_denture_caries || "",
            gingivorragie:
              medicalRecordRes.data["medical-record"]?.dig_gingivopathy || "",
            autresDigestifExamens:
              medicalRecordRes.data["medical-record"]?.dig_other_mouth || "",
            abdomen:
              medicalRecordRes.data["medical-record"]?.dig_abdomen_notes || "",
            hernie:
              medicalRecordRes.data["medical-record"]?.dig_hernia_notes || "",
            foie:
              medicalRecordRes.data["medical-record"]?.dig_liver_notes || "",
            stools: medicalRecordRes.data["medical-record"]?.dig_stools || "",

            // Genitourinary
            pollakiuria:
              medicalRecordRes.data["medical-record"]
                ?.gen_micturition_pollakiuria || false,
            dysuria:
              medicalRecordRes.data["medical-record"]
                ?.gen_micturition_dysuria || false,
            hematuria:
              medicalRecordRes.data["medical-record"]?.gen_hematuria || false,
            micturitionBurning:
              medicalRecordRes.data["medical-record"]
                ?.gen_micturition_burning || false,
            nephriticColic:
              medicalRecordRes.data["medical-record"]?.gen_nephritic_colic ||
              false,
            losses: medicalRecordRes.data["medical-record"]?.gen_losses || "",
            cycles: medicalRecordRes.data["medical-record"]?.gen_cycles || "",
            genOther: medicalRecordRes.data["medical-record"]?.gen_other || "",
            boursesNotes:
              medicalRecordRes.data["medical-record"]?.gen_bourses_notes || "",
            breastsNotes:
              medicalRecordRes.data["medical-record"]?.gen_breasts_notes || "",
            trNotes:
              medicalRecordRes.data["medical-record"]?.gen_tr_notes || "",
            tvNotes:
              medicalRecordRes.data["medical-record"]?.gen_tv_notes || "",

            // Neurological
            sleep: medicalRecordRes.data["medical-record"]?.neu_sleep || "",
            headaches:
              medicalRecordRes.data["medical-record"]?.neu_headaches || false,
            vertigo:
              medicalRecordRes.data["medical-record"]?.neu_vertigo || false,
            agoraphobia:
              medicalRecordRes.data["medical-record"]?.neu_agoraphobia || false,
            lossConsciousness:
              medicalRecordRes.data["medical-record"]?.neu_loss_consciousness ||
              false,
            paresis:
              medicalRecordRes.data["medical-record"]?.neu_paresis || false,
            paresthesia:
              medicalRecordRes.data["medical-record"]?.neu_paresthesia || false,
            neuOther: medicalRecordRes.data["medical-record"]?.neu_other || "",
            tremorNotes:
              medicalRecordRes.data["medical-record"]?.neu_tremor_notes || "",
            rombergNotes:
              medicalRecordRes.data["medical-record"]?.neu_romberg_notes || "",
            reflexesRo:
              medicalRecordRes.data["medical-record"]?.neu_reflexes_ro || "",
            reflexesAch:
              medicalRecordRes.data["medical-record"]?.neu_reflexes_ach || "",
            coordinationNotes:
              medicalRecordRes.data["medical-record"]?.neu_coordination_notes ||
              "",
            sensitivityNotes:
              medicalRecordRes.data["medical-record"]?.neu_sensitivity_notes ||
              "",
            motricityNotes:
              medicalRecordRes.data["medical-record"]?.neu_motricity_notes ||
              "",
            ocularNotes:
              medicalRecordRes.data["medical-record"]?.neu_ocular_notes || "",

            // Hematological
            ecchymoses:
              medicalRecordRes.data["medical-record"]?.hem_ecchymoses || false,
            bleedingTendency:
              medicalRecordRes.data["medical-record"]?.hem_bleeding_tendency ||
              false,
            petechiaeNotes:
              medicalRecordRes.data["medical-record"]?.hem_petechiae_notes ||
              "",
            purpuraNotes:
              medicalRecordRes.data["medical-record"]?.hem_purpura_notes || "",
            spleenNotes:
              medicalRecordRes.data["medical-record"]?.hem_spleen_notes || "",
            ganglionsCervical:
              medicalRecordRes.data["medical-record"]?.hem_ganglions_cervical ||
              "",
            ganglionsAxillary:
              medicalRecordRes.data["medical-record"]?.hem_ganglions_axillary ||
              "",
            ganglionsClavicular:
              medicalRecordRes.data["medical-record"]
                ?.hem_ganglions_clavicular || "",
            ganglionsInguinal:
              medicalRecordRes.data["medical-record"]?.hem_ganglions_inguinal ||
              "",

            // Endocrine
            familyObesity:
              medicalRecordRes.data["medical-record"]?.end_family_obesity ||
              false,
            familyThinness:
              medicalRecordRes.data["medical-record"]?.end_family_thinness ||
              false,
            thyroidNotes:
              medicalRecordRes.data["medical-record"]?.end_thyroid_notes || "",
            testiclesNotes:
              medicalRecordRes.data["medical-record"]?.end_testicles_notes ||
              "",
            mammaryNotes:
              medicalRecordRes.data["medical-record"]?.end_mammary_notes || "",

            // Psychological
            psychologicalProfile:
              medicalRecordRes.data["medical-record"]?.psychological_profile ||
              "",

            // Functional Exploration
            expFuncRespiratory:
              medicalRecordRes.data["medical-record"]?.exp_func_respiratory ||
              "",
            expFuncCirculatory:
              medicalRecordRes.data["medical-record"]?.exp_func_circulatory ||
              "",
            expFuncMotor:
              medicalRecordRes.data["medical-record"]?.exp_func_motor || "",

            // Complementary Exams
            examCompRadiological:
              medicalRecordRes.data["medical-record"]?.exam_comp_radiological ||
              "",
            examCompBioBlood:
              medicalRecordRes.data["medical-record"]?.exam_comp_bio_blood ||
              "",
            examCompBioUrinary:
              medicalRecordRes.data["medical-record"]?.exam_comp_bio_urinary ||
              "",
            examCompHepViral:
              medicalRecordRes.data["medical-record"]?.exam_comp_hep_viral ||
              "",
            examCompSyphilis:
              medicalRecordRes.data["medical-record"]?.exam_comp_syphilis || "",
            examCompHiv:
              medicalRecordRes.data["medical-record"]?.exam_comp_hiv || "",

            // EPS
            epsApt: medicalRecordRes.data["medical-record"]?.eps_apt || false,
            epsMotifs:
              medicalRecordRes.data["medical-record"]?.eps_motifs || "",
            orientationSpecialist:
              medicalRecordRes.data["medical-record"]?.orientation_specialist ||
              "",
            orientationOpinion:
              medicalRecordRes.data["medical-record"]?.orientation_opinion ||
              false,
            orientationHospitalization:
              medicalRecordRes.data["medical-record"]
                ?.orientation_hospitalization || false,
            orientationTreatment:
              medicalRecordRes.data["medical-record"]?.orientation_treatment ||
              false,
            orientationResponse:
              medicalRecordRes.data["medical-record"]?.orientation_response ||
              "",
          });
        }
        console.log(medicalRecordRes);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Failed to fetch patient data");
        if (err.response?.status === 403) {
          router.push("/unauthorized");
        } else if (err.response?.status === 404) {
          setMedicalRecord(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patientId, router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const ensureString = (value) => {
        if (value === null || value === undefined || value === "") return null;
        return String(value);
      };

      const toBool = (value) => Boolean(value);
      const toInt = (value) => {
        if (value === null || value === undefined || value === "") return 0;
        const num = parseInt(value);
        return isNaN(num) ? 0 : num;
      };
      const toFloat = (value) => {
        if (value === null || value === undefined || value === "") return 0;
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
      };

      const payload = {
        dossier_number: ensureString(formData.dossierNumber),
        blood_group: ensureString(formData.bloodType),
        social_security_number: ensureString(formData.nir),
        family_situation: ensureString(formData.familySituation),
        address: ensureString(formData.address),
        service: ensureString(formData.service),
        admission_date: formData.birthDate || "2025-04-04",
        study_field: ensureString(formData.service),

        // Medical History
        medication_details: ensureString(formData.meds),
        other_intoxications: ensureString(formData.others),
        congenital_conditions: ensureString(formData.congenitalConditions),
        general_diseases: ensureString(formData.generalDiseases),
        surgical_interventions: ensureString(formData.surgical_interventions),
        medication_allergies: ensureString(formData.medAllergies),

        // Anthropometric Data
        weight_kg: toFloat(formData.weight),
        height_cm: toInt(formData.height),

        // Visual Acuity
        visual_acuity_od_sc: ensureString(formData.visualAcuityOdSc),
        visual_acuity_og_sc: ensureString(formData.visualAcuityOgSc),
        visual_acuity_od_wc: ensureString(formData.visualAcuityOdWc),
        visual_acuity_og_wc: ensureString(formData.visualAcuityOgWc),
        audition_od: ensureString(formData.auditionOd),
        audition_og: ensureString(formData.auditionOg),

        // Tobacco/Alcohol
        smoker: toBool(formData.smoker),
        cigarettes_per_day: toInt(formData.cigarettesPerDay),
        chewer: toBool(formData.chewTobacco),
        boxes_per_day_chew: toInt(formData.boxesPerDayChew),
        snuff_user: toBool(formData.snuffUser),
        boxes_per_day_snuff: toInt(formData.boxesPerDaySnuff),
        age_first_tobacco_use: toInt(formData.ageFirstTobaccoUse),
        former_smoker: toBool(formData.formerSmoker),
        exposure_period: ensureString(formData.exposurePeriod),
        alcohol_details: ensureString(formData.alcoholDetails),

        // Skin and Mucous Membranes
        skin_conditions: toBool(formData.affectationCutanees).toString(),
        skin_exam_notes: ensureString(formData.skinExamNotes),

        // Ophthalmological
        oph_tearing: toBool(formData.larmoiement),
        oph_pain: toBool(formData.douleurs),
        oph_spots: toBool(formData.taches),
        oph_exam_notes: ensureString(formData.ophExamNotes),

        // ORL
        orl_tinnitus: toBool(formData.sifflements),
        orl_repeated_angina: toBool(formData.angine),
        orl_epistaxis: toBool(formData.epistaxis),
        orl_rhinorrhea: toBool(formData.rhinorrhee),
        orl_other: ensureString(formData.autreOrl),
        orl_exam_notes: ensureString(formData.orlExamNotes),

        // Locomotor
        loc_pain_muscular: toBool(formData.musculaires),
        loc_pain_articular: toBool(formData.articulaires),
        loc_pain_vertebral: toBool(formData.vertebrales),
        loc_pain_neurological: toBool(formData.neurological),
        loc_movement_difficulty: toBool(formData.movementDifficulty),
        loc_fatigability: toBool(formData.fatigability),
        loc_exam_notes: ensureString(formData.locExamNotes),

        // Cardiovascular
        car_palpitations: toBool(formData.palpitation),
        car_edema: toBool(formData.oedemes),
        car_pain_walking: toBool(formData.aLaMarche),
        car_pain_rest: toBool(formData.auRepos),
        car_pain_effort: toBool(formData.aEffort),
        car_pain_permanent: toBool(formData.permanents),
        pulse_rate: toInt(formData.pouls),
        blood_pressure: ensureString(formData.ta),
        cyanosis: formData.cyanose === "Yes",
        car_exam_notes: ensureString(formData.carExamNotes),

        // Respiratory
        res_cough: toBool(formData.toux),
        res_dyspnea_nocturnal: toBool(formData.dyspneeNocturne),
        res_dyspnea_diurnal: toBool(formData.dyspneeDiurne),
        res_expectorations: ensureString(formData.expectorations),
        res_thoracic_pain: toBool(formData.douleursThoraciques),
        res_other: ensureString(formData.autreRespiratoire),
        respiratory_rate: toInt(formData.respiratoryRate),
        res_exam_notes: ensureString(formData.resExamNotes),

        // Digestive
        dig_pyrosis: toBool(formData.pyrosis),
        dig_vomiting: toBool(formData.vomissements),
        dig_appetite: ensureString(formData.appetitDetails),
        dig_transit: ensureString(formData.transitDetails),
        dig_rectorrhagia: toBool(formData.rectalgiesDetails),
        dig_abdominal_pain: toBool(formData.douleurAbdominaleDetails),
        dig_other: ensureString(formData.autresDigestifDetails),
        dig_denture_caries: ensureString(formData.denture),
        dig_gingivopathy: ensureString(formData.gingivorragie),
        dig_other_mouth: ensureString(formData.autresDigestifExamens),
        dig_abdomen_notes: ensureString(formData.abdomen),
        dig_hernia_notes: ensureString(formData.hernie),
        dig_liver_notes: ensureString(formData.foie),
        dig_stools: ensureString(formData.stools),

        // Genitourinary
        gen_micturition_pollakiuria: toBool(formData.pollakiuria),
        gen_micturition_dysuria: toBool(formData.dysuria),
        gen_hematuria: toBool(formData.hematuria),
        gen_micturition_burning: toBool(formData.micturitionBurning),
        gen_nephritic_colic: toBool(formData.nephriticColic),
        gen_losses: ensureString(formData.losses),
        gen_cycles: ensureString(formData.cycles),
        gen_other: ensureString(formData.genOther),
        gen_bourses_notes: ensureString(formData.boursesNotes),
        gen_breasts_notes: ensureString(formData.breastsNotes),
        gen_tr_notes: ensureString(formData.trNotes),
        gen_tv_notes: ensureString(formData.tvNotes),

        // Neurological
        neu_sleep: ensureString(formData.sleep),
        neu_headaches: toBool(formData.headaches),
        neu_vertigo: toBool(formData.vertigo),
        neu_agoraphobia: toBool(formData.agoraphobia),
        neu_loss_consciousness: toBool(formData.lossConsciousness),
        neu_paresis: toBool(formData.paresis),
        neu_paresthesia: toBool(formData.paresthesia),
        neu_other: ensureString(formData.neuOther),
        neu_tremor_notes: ensureString(formData.tremorNotes),
        neu_romberg_notes: ensureString(formData.rombergNotes),
        neu_reflexes_ro: ensureString(formData.reflexesRo),
        neu_reflexes_ach: ensureString(formData.reflexesAch),
        neu_coordination_notes: ensureString(formData.coordinationNotes),
        neu_sensitivity_notes: ensureString(formData.sensitivityNotes),
        neu_motricity_notes: ensureString(formData.motricityNotes),
        neu_ocular_notes: ensureString(formData.ocularNotes),

        // Hematological
        hem_ecchymoses: toBool(formData.ecchymoses),
        hem_bleeding_tendency: toBool(formData.bleedingTendency),
        hem_petechiae_notes: ensureString(formData.petechiaeNotes),
        hem_purpura_notes: ensureString(formData.purpuraNotes),
        hem_spleen_notes: ensureString(formData.spleenNotes),
        hem_ganglions_cervical: ensureString(formData.ganglionsCervical),
        hem_ganglions_axillary: ensureString(formData.ganglionsAxillary),
        hem_ganglions_clavicular: ensureString(formData.ganglionsClavicular),
        hem_ganglions_inguinal: ensureString(formData.ganglionsInguinal),

        // Endocrine
        end_family_obesity: toBool(formData.familyObesity),
        end_family_thinness: toBool(formData.familyThinness),
        end_thyroid_notes: ensureString(formData.thyroidNotes),
        end_testicles_notes: ensureString(formData.testiclesNotes),
        end_mammary_notes: ensureString(formData.mammaryNotes),

        // Psychological
        psychological_profile: ensureString(formData.psychologicalProfile),

        // Functional Exploration
        exp_func_respiratory: ensureString(formData.expFuncRespiratory),
        exp_func_circulatory: ensureString(formData.expFuncCirculatory),
        exp_func_motor: ensureString(formData.expFuncMotor),

        // Complementary Exams
        exam_comp_radiological: ensureString(formData.examCompRadiological),
        exam_comp_bio_blood: ensureString(formData.examCompBioBlood),
        exam_comp_bio_urinary: ensureString(formData.examCompBioUrinary),
        exam_comp_hep_viral: ensureString(formData.examCompHepViral),
        exam_comp_syphilis: ensureString(formData.examCompSyphilis),
        exam_comp_hiv: ensureString(formData.examCompHiv),

        // EPS
        eps_apt: toBool(formData.epsApt),
        eps_motifs: ensureString(formData.epsMotifs),
        orientation_specialist: ensureString(formData.orientationSpecialist),
        orientation_opinion: toBool(formData.orientationOpinion),
        orientation_hospitalization: toBool(
          formData.orientationHospitalization
        ),
        orientation_treatment: toBool(formData.orientationTreatment),
        orientation_response: ensureString(formData.orientationResponse),
      };

      // For debugging - log the payload before sending
      console.log("Sending payload:", payload);

      const response = await api.post(
        `/api/doctors/medical-records/${patientId}`,
        payload
      );

      setMedicalRecord(response.data);
      alert("Medical record updated successfully");
    } catch (error) {
      console.error("Error updating record:", error);

      // Enhanced error handling
      if (error.response?.data?.errors) {
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join("\n");
        alert(`Validation errors:\n${errorMessages}`);
      } else {
        alert(
          error.response?.data?.message || "Failed to update medical record"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  if (!medicalRecord || !patient) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600">
          No medical record found for this patient
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex h-full bg-gray-100">
        <aside className="w-65 bg-white shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-8">
            <img src="/Logo.svg" className="w-10 h-10" alt="Logo" />
            <h1 className="font-bold text-xl text-gray-800">Doctor Esi</h1>
          </div>
          <nav>
            <h2 className="text-gray-500 text-sm font-light mb-2">Favorites</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="hover:text-black cursor-pointer flex items-center gap-2">
                <span className="text-gray-500 font-light text-xl">•</span>{" "}
                Overview
              </li>
              <li className="hover:text-black cursor-pointer flex items-center gap-2">
                <span className="text-gray-500 font-light text-xl">•</span>{" "}
                Schedule
              </li>
            </ul>
            <h2 className="text-gray-500 text-sm font-light mt-6 mb-2">
              Dashboards
            </h2>
            <ul className="space-y-3 text-gray-700">
              {["Default", "Activities", "Schedule", "Something"].map(
                (item, index) => (
                  <li
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer relative ${
                      item === "Default"
                        ? "bg-[#E1E1E1] text-black"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {item === "Default" && (
                      <div className="absolute left-0 top-3 h-[50%] w-1.5 bg-black rounded"></div>
                    )}
                    <img src={`/${item}.svg`} className="w-5 h-5" alt={item} />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
            <h2 className="text-gray-500 text-sm font-light mt-6 mb-2">
              Pages
            </h2>
            <ul className="space-y-3 text-gray-700">
              {[
                {
                  icon: "/Userp.svg",
                  label: "User Profile",
                  subItems: [
                    "Overview",
                    "Projects",
                    "Campaigns",
                    "Documents",
                    "Usage",
                  ],
                },
                { icon: "/Account.svg", label: "Account" },
                { icon: "/Corporate.svg", label: "Corporate" },
                { icon: "/Blog.svg", label: "Blog" },
                { icon: "/Social.svg", label: "Social" },
              ].map((page, index) => (
                <li key={index} className="flex flex-col">
                  <div
                    className="flex items-center space-x-3 p-3 hover:bg-gray-200 rounded-lg cursor-pointer"
                    onClick={() => toggleSection(page.label)}
                  >
                    {page.subItems && (
                      <span
                        className={`text-gray-500 transition-transform ${
                          openSections[page.label] ? "rotate-90" : ""
                        }`}
                      >
                        <img
                          src="/ArrowLineRight.svg"
                          alt=""
                          className="w-5 h-5 "
                        />
                      </span>
                    )}
                    <img src={page.icon} className="w-5 h-5" alt={page.label} />
                    <span>{page.label}</span>
                  </div>
                  {page.subItems && openSections[page.label] && (
                    <ul className="pl-6 space-y-1 text-gray-500 text-sm">
                      {page.subItems.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="hover:text-black cursor-pointer"
                        >
                          {subItem}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-8 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Patient Profile
            </h2>
            <button
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-10 py-1.5 rounded-lg transition"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
          <section className="mt-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gray-300 rounded-full">
                <img
                  src="/default-avatar.svg"
                  className="w-full"
                  alt="Patient Avatar"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {patient.firstName} {patient.familyName}
                </h3>
                <p className="text-gray-400 text-sm">{patient.email}</p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">
                Patient Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <input
                    type="text"
                    name="Age"
                    value={formData.Age || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service
                  </label>
                  <input
                    type="text"
                    name="service"
                    value={formData.service || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Dossier Number
                  </label>
                  <input
                    type="text"
                    name="dossierNumber"
                    value={formData.dossierNumber || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Blood Type
                  </label>
                  <select
                    name="bloodType"
                    value={formData.bloodType || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                  >
                    <option value="">Select blood type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A−</option>
                    <option value="B+">B+</option>
                    <option value="B-">B−</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB−</option>
                    <option value="O+">O+</option>
                    <option value="O-">O−</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    NIR
                  </label>
                  <input
                    type="text"
                    name="nir"
                    value={formData.nir || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Family Situation
                  </label>
                  <input
                    type="text"
                    name="familySituation"
                    value={formData.familySituation || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Medications
                  </label>
                  <input
                    type="text"
                    name="meds"
                    value={formData.meds || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Others
                  </label>
                  <input
                    type="text"
                    name="others"
                    value={formData.others || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Congenital Conditions
                  </label>
                  <input
                    type="text"
                    name="congenitalConditions"
                    value={formData.congenitalConditions || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    General Diseases
                  </label>
                  <input
                    type="text"
                    name="generalDiseases"
                    value={formData.generalDiseases || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Medication Allergies
                  </label>
                  <input
                    type="text"
                    name="medAllergies"
                    value={formData.medAllergies || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium pt-6">Tabacs:</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="smoker"
                    name="smoker"
                    checked={formData.smoker || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <label
                    htmlFor="smoker"
                    className="ml-2 text-sm text-gray-700"
                  >
                    a fumer
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="chewTobacco"
                    name="chewTobacco"
                    checked={formData.chewTobacco || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <label
                    htmlFor="chewTobacco"
                    className="ml-2 text-sm text-gray-700"
                  >
                    a chiquer
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="snuffUser"
                    name="snuffUser"
                    checked={formData.snuffUser || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <label
                    htmlFor="snuffUser"
                    className="ml-2 text-sm text-gray-700"
                  >
                    à prise
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="formerSmoker"
                    name="formerSmoker"
                    checked={formData.formerSmoker || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <label
                    htmlFor="formerSmoker"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Ancien fumeur
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="alcohol"
                    name="alcohol"
                    checked={formData.alcohol || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <label
                    htmlFor="alcohol"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Alcool
                  </label>
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Cigarettes per day:
                  </label>
                  <input
                    type="number"
                    name="cigarettesPerDay"
                    value={formData.cigarettesPerDay || 0}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Age first tobacco use:
                  </label>
                  <input
                    type="number"
                    name="ageFirstTobaccoUse"
                    value={formData.ageFirstTobaccoUse || 0}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Exposure period:
                  </label>
                  <input
                    type="text"
                    name="exposurePeriod"
                    value={formData.exposurePeriod || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Alcohol details:
                  </label>
                  <input
                    type="text"
                    name="alcoholDetails"
                    value={formData.alcoholDetails || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-y-2 border-gray-300 py-2 text-center font-medium">
                      Appareils
                    </th>
                    <th className="border-y-2 border-gray-300 py-2 text-center font-medium">
                      Interrogatoire
                    </th>
                    <th className="border-y-2 border-gray-300 py-2 text-center font-medium">
                      Examens Clinique
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="align-top border-b-2 border-gray-300">
                    <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">
                            Peau et Muqueuses
                          </h4>
                        </div>
                      </div>
                    </td>
                    <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="affectationCutanees"
                            name="affectationCutanees"
                            checked={formData.affectationCutanees || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="affectationCutanees"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Affectation cutanées
                          </label>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 pt-4 w-1/3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Notes:
                        </label>
                        <textarea
                          name="skinExamNotes"
                          value={formData.skinExamNotes || ""}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          rows="3"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr className="align-top border-b-2 border-gray-300">
                    <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">
                            Ophtalmologique
                          </h4>
                        </div>
                      </div>
                    </td>
                    <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="larmoiement"
                            name="larmoiement"
                            checked={formData.larmoiement || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="larmoiement"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Larmoiement
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="douleurs"
                            name="douleurs"
                            checked={formData.douleurs || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="douleurs"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Douleurs
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="taches"
                            name="taches"
                            checked={formData.taches || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="taches"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Taches Devant Les Yeux
                          </label>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Notes:
                          </label>
                          <textarea
                            name="ophExamNotes"
                            value={formData.ophExamNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="3"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Visual Acuity OD SC:
                            </label>
                            <input
                              type="text"
                              name="visualAcuityOdSc"
                              value={formData.visualAcuityOdSc || ""}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Visual Acuity OG SC:
                            </label>
                            <input
                              type="text"
                              name="visualAcuityOgSc"
                              value={formData.visualAcuityOgSc || ""}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Visual Acuity OD WC:
                            </label>
                            <input
                              type="text"
                              name="visualAcuityOdWc"
                              value={formData.visualAcuityOdWc || ""}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Visual Acuity OG WC:
                            </label>
                            <input
                              type="text"
                              name="visualAcuityOgWc"
                              value={formData.visualAcuityOgWc || ""}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Audition OD:
                            </label>
                            <input
                              type="text"
                              name="auditionOd"
                              value={formData.auditionOd || ""}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Audition OG:
                            </label>
                            <input
                              type="text"
                              name="auditionOg"
                              value={formData.auditionOg || ""}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="align-top border-b-2 border-gray-300">
                    <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">O.R.L</h4>
                        </div>
                      </div>
                    </td>
                    <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="sifflements"
                            name="sifflements"
                            checked={formData.sifflements || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="sifflements"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Sifflements
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="angine"
                            name="angine"
                            checked={formData.angine || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="angine"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Angine répétées
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="epistaxis"
                            name="epistaxis"
                            checked={formData.epistaxis || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="epistaxis"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Epistaxis
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="rhinorrhee"
                            name="rhinorrhee"
                            checked={formData.rhinorrhee || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="rhinorrhee"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Rhinorrhée
                          </label>
                        </div>
                        <div className="mt-2 flex items-center">
                          <label className="block text-sm font-medium text-gray-700">
                            Autre:
                          </label>
                          <input
                            type="text"
                            name="autreOrl"
                            value={formData.autreOrl || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 pt-4 w-1/3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Notes:
                        </label>
                        <textarea
                          name="orlExamNotes"
                          value={formData.orlExamNotes || ""}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          rows="3"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr className="align-top border-b-2 border-gray-300">
                    <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                      <div className="space-y-4">
                        <div className="mt-6">
                          <h4 className="mb-2 text-sm font-medium">
                            Locomoteur
                          </h4>
                        </div>
                      </div>
                    </td>
                    <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <h4 className="mb-2 text-sm font-medium">Douleurs :</h4>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="musculaires"
                            name="musculaires"
                            checked={formData.musculaires || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="musculaires"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Musculaires
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="articulaires"
                            name="articulaires"
                            checked={formData.articulaires || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="articulaires"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Articulaires
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="vertebrales"
                            name="vertebrales"
                            checked={formData.vertebrales || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="vertebrales"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Vertébrales
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="neurological"
                            name="neurological"
                            checked={formData.neurological || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="neurological"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Neurological
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="movementDifficulty"
                            name="movementDifficulty"
                            checked={formData.movementDifficulty || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="movementDifficulty"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Movement Difficulty
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="fatigability"
                            name="fatigability"
                            checked={formData.fatigability || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="fatigability"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Fatigability
                          </label>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 pt-4 w-1/3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Notes:
                        </label>
                        <textarea
                          name="locExamNotes"
                          value={formData.locExamNotes || ""}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          rows="3"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr className="align-top border-b-2 border-gray-300">
                    <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">
                            Cardio - Vasculaire
                          </h4>
                        </div>
                      </div>
                    </td>
                    <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="palpitation"
                            name="palpitation"
                            checked={formData.palpitation || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="palpitation"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Palpitation
                          </label>
                        </div>
                        <h4 className="mb-2 text-sm font-medium">Douleurs :</h4>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="oedemes"
                            name="oedemes"
                            checked={formData.oedemes || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="oedemes"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Oedèmes
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="aLaMarche"
                            name="aLaMarche"
                            checked={formData.aLaMarche || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="aLaMarche"
                            className="ml-2 text-sm text-gray-700"
                          >
                            À la marche
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="auRepos"
                            name="auRepos"
                            checked={formData.auRepos || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="auRepos"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Au repos
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="aEffort"
                            name="aEffort"
                            checked={formData.aEffort || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="aEffort"
                            className="ml-2 text-sm text-gray-700"
                          >
                            À l'effort
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="permanents"
                            name="permanents"
                            checked={formData.permanents || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="permanents"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Permanents
                          </label>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Pouls :
                          </label>
                          <input
                            type="text"
                            name="pouls"
                            value={formData.pouls || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            T.A :
                          </label>
                          <input
                            type="text"
                            name="ta"
                            value={formData.ta || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Cyanose :
                          </label>
                          <select
                            name="cyanose"
                            value={formData.cyanose || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Notes:
                          </label>
                          <textarea
                            name="carExamNotes"
                            value={formData.carExamNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="3"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="align-top border-b-2 border-gray-300">
                    <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">
                            Respiratoire
                          </h4>
                        </div>
                      </div>
                    </td>
                    <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="toux"
                            name="toux"
                            checked={formData.toux || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="toux"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Toux
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="dyspneeNocturne"
                            name="dyspneeNocturne"
                            checked={formData.dyspneeNocturne || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="dyspneeNocturne"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Dyspnée Nocturne
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="dyspneeDiurne"
                            name="dyspneeDiurne"
                            checked={formData.dyspneeDiurne || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="dyspneeDiurne"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Dyspnée Diurne
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="expectorations"
                            name="expectorations"
                            checked={formData.expectorations || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="expectorations"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Expectorations
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="douleursThoraciques"
                            name="douleursThoraciques"
                            checked={formData.douleursThoraciques || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="douleursThoraciques"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Douleurs thoraciques
                          </label>
                        </div>
                        <div className="mt-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Autre :
                          </label>
                          <input
                            type="text"
                            name="autreRespiratoire"
                            value={formData.autreRespiratoire || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Respiratory Rate:
                          </label>
                          <input
                            type="text"
                            name="respiratoryRate"
                            value={formData.respiratoryRate || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Notes:
                          </label>
                          <textarea
                            name="resExamNotes"
                            value={formData.resExamNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="3"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="align-top border-b-2 border-gray-300">
                    <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">Digestif</h4>
                        </div>
                      </div>
                    </td>
                    <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="pyrosis"
                            name="pyrosis"
                            checked={formData.pyrosis || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="pyrosis"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Pyrosis
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="vomissements"
                            name="vomissements"
                            checked={formData.vomissements || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="vomissements"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Vomissements
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="appetit"
                            name="appetit"
                            checked={formData.appetit || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="appetit"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Appétit
                          </label>
                          <input
                            type="text"
                            name="appetitDetails"
                            value={formData.appetitDetails || ""}
                            onChange={handleInputChange}
                            className="ml-2 w-20 rounded-md border border-gray-300 px-2 py-1 text-sm"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="transit"
                            name="transit"
                            checked={formData.transit || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="transit"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Transit
                          </label>
                          <input
                            type="text"
                            name="transitDetails"
                            value={formData.transitDetails || ""}
                            onChange={handleInputChange}
                            className="ml-2 w-20 rounded-md border border-gray-300 px-2 py-1 text-sm"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="rectalgies"
                            name="rectalgies"
                            checked={formData.rectalgies || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="rectalgies"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Rectalgies
                          </label>
                          <input
                            type="text"
                            name="rectalgiesDetails"
                            value={formData.rectalgiesDetails || ""}
                            onChange={handleInputChange}
                            className="ml-2 w-20 rounded-md border border-gray-300 px-2 py-1 text-sm"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="douleurAbdominale"
                            name="douleurAbdominale"
                            checked={formData.douleurAbdominale || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="douleurAbdominale"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Douleur abdominale
                          </label>
                          <input
                            type="text"
                            name="douleurAbdominaleDetails"
                            value={formData.douleurAbdominaleDetails || ""}
                            onChange={handleInputChange}
                            className="ml-2 w-20 rounded-md border border-gray-300 px-2 py-1 text-sm"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="autresDigestif"
                            name="autresDigestif"
                            checked={formData.autresDigestif || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="autresDigestif"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Autres
                          </label>
                          <input
                            type="text"
                            name="autresDigestifDetails"
                            value={formData.autresDigestifDetails || ""}
                            onChange={handleInputChange}
                            className="ml-2 w-20 rounded-md border border-gray-300 px-2 py-1 text-sm"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Denture :
                          </label>
                          <input
                            type="text"
                            name="denture"
                            value={formData.denture || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Gingivorragie :
                          </label>
                          <input
                            type="text"
                            name="gingivorragie"
                            value={formData.gingivorragie || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Stools:
                          </label>
                          <input
                            type="text"
                            name="stools"
                            value={formData.stools || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Autres :
                          </label>
                          <input
                            type="text"
                            name="autresDigestifExamens"
                            value={formData.autresDigestifExamens || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Abdomen :
                          </label>
                          <input
                            type="text"
                            name="abdomen"
                            value={formData.abdomen || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Hernie :
                          </label>
                          <input
                            type="text"
                            name="hernie"
                            value={formData.hernie || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Foie :
                          </label>
                          <input
                            type="text"
                            name="foie"
                            value={formData.foie || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="align-top border-b-2 border-gray-300">
                    <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">
                            Genitourinary
                          </h4>
                        </div>
                      </div>
                    </td>
                    <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="pollakiuria"
                            name="pollakiuria"
                            checked={formData.pollakiuria || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="pollakiuria"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Pollakiuria
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="dysuria"
                            name="dysuria"
                            checked={formData.dysuria || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="dysuria"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Dysuria
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="hematuria"
                            name="hematuria"
                            checked={formData.hematuria || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="hematuria"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Hematuria
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="micturitionBurning"
                            name="micturitionBurning"
                            checked={formData.micturitionBurning || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="micturitionBurning"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Micturition Burning
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="nephriticColic"
                            name="nephriticColic"
                            checked={formData.nephriticColic || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="nephriticColic"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Nephritic Colic
                          </label>
                        </div>
                        <div className="mt-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Losses:
                          </label>
                          <input
                            type="text"
                            name="losses"
                            value={formData.losses || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div className="mt-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Cycles:
                          </label>
                          <input
                            type="text"
                            name="cycles"
                            value={formData.cycles || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div className="mt-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Other:
                          </label>
                          <input
                            type="text"
                            name="genOther"
                            value={formData.genOther || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Bourses Notes:
                          </label>
                          <textarea
                            name="boursesNotes"
                            value={formData.boursesNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Breasts Notes:
                          </label>
                          <textarea
                            name="breastsNotes"
                            value={formData.breastsNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            TR Notes:
                          </label>
                          <textarea
                            name="trNotes"
                            value={formData.trNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            TV Notes:
                          </label>
                          <textarea
                            name="tvNotes"
                            value={formData.tvNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="align-top border-b-2 border-gray-300">
                    <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">
                            Neurological
                          </h4>
                        </div>
                      </div>
                    </td>
                    <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Sleep:
                          </label>
                          <input
                            type="text"
                            name="sleep"
                            value={formData.sleep || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="headaches"
                            name="headaches"
                            checked={formData.headaches || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="headaches"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Headaches
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="vertigo"
                            name="vertigo"
                            checked={formData.vertigo || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="vertigo"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Vertigo
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="agoraphobia"
                            name="agoraphobia"
                            checked={formData.agoraphobia || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="agoraphobia"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Agoraphobia
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="lossConsciousness"
                            name="lossConsciousness"
                            checked={formData.lossConsciousness || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="lossConsciousness"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Loss of Consciousness
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="paresis"
                            name="paresis"
                            checked={formData.paresis || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="paresis"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Paresis
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="paresthesia"
                            name="paresthesia"
                            checked={formData.paresthesia || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="paresthesia"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Paresthesia
                          </label>
                        </div>
                        <div className="mt-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Other:
                          </label>
                          <input
                            type="text"
                            name="neuOther"
                            value={formData.neuOther || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Tremor Notes:
                          </label>
                          <textarea
                            name="tremorNotes"
                            value={formData.tremorNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Romberg Notes:
                          </label>
                          <textarea
                            name="rombergNotes"
                            value={formData.rombergNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Reflexes RO:
                            </label>
                            <input
                              type="text"
                              name="reflexesRo"
                              value={formData.reflexesRo || ""}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Reflexes ACH:
                            </label>
                            <input
                              type="text"
                              name="reflexesAch"
                              value={formData.reflexesAch || ""}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Coordination Notes:
                          </label>
                          <textarea
                            name="coordinationNotes"
                            value={formData.coordinationNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Sensitivity Notes:
                          </label>
                          <textarea
                            name="sensitivityNotes"
                            value={formData.sensitivityNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Motricity Notes:
                          </label>
                          <textarea
                            name="motricityNotes"
                            value={formData.motricityNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Ocular Notes:
                          </label>
                          <textarea
                            name="ocularNotes"
                            value={formData.ocularNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="align-top border-b-2 border-gray-300">
                    <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">
                            Hematological
                          </h4>
                        </div>
                      </div>
                    </td>
                    <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="ecchymoses"
                            name="ecchymoses"
                            checked={formData.ecchymoses || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="ecchymoses"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Ecchymoses
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="bleedingTendency"
                            name="bleedingTendency"
                            checked={formData.bleedingTendency || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="bleedingTendency"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Bleeding Tendency
                          </label>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Petechiae Notes:
                          </label>
                          <textarea
                            name="petechiaeNotes"
                            value={formData.petechiaeNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Purpura Notes:
                          </label>
                          <textarea
                            name="purpuraNotes"
                            value={formData.purpuraNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Spleen Notes:
                          </label>
                          <textarea
                            name="spleenNotes"
                            value={formData.spleenNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Ganglions Cervical:
                            </label>
                            <input
                              type="text"
                              name="ganglionsCervical"
                              value={formData.ganglionsCervical || ""}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Ganglions Axillary:
                            </label>
                            <input
                              type="text"
                              name="ganglionsAxillary"
                              value={formData.ganglionsAxillary || ""}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Ganglions Clavicular:
                            </label>
                            <input
                              type="text"
                              name="ganglionsClavicular"
                              value={formData.ganglionsClavicular || ""}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Ganglions Inguinal:
                            </label>
                            <input
                              type="text"
                              name="ganglionsInguinal"
                              value={formData.ganglionsInguinal || ""}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="align-top border-b-2 border-gray-300">
                    <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">
                            Endocrine
                          </h4>
                        </div>
                      </div>
                    </td>
                    <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="familyObesity"
                            name="familyObesity"
                            checked={formData.familyObesity || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="familyObesity"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Family Obesity
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="familyThinness"
                            name="familyThinness"
                            checked={formData.familyThinness || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="familyThinness"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Family Thinness
                          </label>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Thyroid Notes:
                          </label>
                          <textarea
                            name="thyroidNotes"
                            value={formData.thyroidNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Testicles Notes:
                          </label>
                          <textarea
                            name="testiclesNotes"
                            value={formData.testiclesNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Mammary Notes:
                          </label>
                          <textarea
                            name="mammaryNotes"
                            value={formData.mammaryNotes || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="align-top border-b-2 border-gray-300">
                    <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">
                            Psychological
                          </h4>
                        </div>
                      </div>
                    </td>
                    <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Psychological Profile:
                        </label>
                        <textarea
                          name="psychologicalProfile"
                          value={formData.psychologicalProfile || ""}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          rows="3"
                        />
                      </div>
                    </td>
                    <td className="p-4 pt-4 w-1/3"></td>
                  </tr>
                  <tr className="align-top border-b-2 border-gray-300">
                    <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">
                            Functional Exploration
                          </h4>
                        </div>
                      </div>
                    </td>
                    <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Respiratory:
                          </label>
                          <textarea
                            name="expFuncRespiratory"
                            value={formData.expFuncRespiratory || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Circulatory:
                          </label>
                          <textarea
                            name="expFuncCirculatory"
                            value={formData.expFuncCirculatory || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Motor:
                          </label>
                          <textarea
                            name="expFuncMotor"
                            value={formData.expFuncMotor || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 pt-4 w-1/3"></td>
                  </tr>
                  <tr className="align-top border-b-2 border-gray-300">
                    <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">
                            Complementary Exams
                          </h4>
                        </div>
                      </div>
                    </td>
                    <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Radiological:
                          </label>
                          <textarea
                            name="examCompRadiological"
                            value={formData.examCompRadiological || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Bio Blood:
                          </label>
                          <textarea
                            name="examCompBioBlood"
                            value={formData.examCompBioBlood || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Bio Urinary:
                          </label>
                          <textarea
                            name="examCompBioUrinary"
                            value={formData.examCompBioUrinary || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Hep Viral:
                          </label>
                          <textarea
                            name="examCompHepViral"
                            value={formData.examCompHepViral || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Syphilis:
                          </label>
                          <textarea
                            name="examCompSyphilis"
                            value={formData.examCompSyphilis || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            HIV:
                          </label>
                          <textarea
                            name="examCompHiv"
                            value={formData.examCompHiv || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="align-top border-b-2 border-gray-300">
                    <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">EPS</h4>
                        </div>
                      </div>
                    </td>
                    <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="epsApt"
                            name="epsApt"
                            checked={formData.epsApt || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="epsApt"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Apt
                          </label>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Motifs:
                          </label>
                          <textarea
                            name="epsMotifs"
                            value={formData.epsMotifs || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Orientation Specialist:
                          </label>
                          <input
                            type="text"
                            name="orientationSpecialist"
                            value={formData.orientationSpecialist || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="orientationOpinion"
                            name="orientationOpinion"
                            checked={formData.orientationOpinion || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="orientationOpinion"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Orientation Opinion
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="orientationHospitalization"
                            name="orientationHospitalization"
                            checked={
                              formData.orientationHospitalization || false
                            }
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="orientationHospitalization"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Orientation Hospitalization
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="orientationTreatment"
                            name="orientationTreatment"
                            checked={formData.orientationTreatment || false}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <label
                            htmlFor="orientationTreatment"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Orientation Treatment
                          </label>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Orientation Response:
                          </label>
                          <textarea
                            name="orientationResponse"
                            value={formData.orientationResponse || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            rows="2"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 pt-4 w-1/3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
        <aside className="w-80 bg-white p-6 shadow-xl rounded-2xl">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Notifications
          </h2>
          <ul className="text-[13px] space-y-3">
            {[
              {
                icon: "/problem.svg",
                text: "You have a student who submitted a long report about something important",
                time: "Just now",
              },
              {
                icon: "/newprof.svg",
                text: "Akram needs his medical history",
                time: "59 minutes ago",
              },
              {
                icon: "/alarm.svg",
                text: "Tarek missed his appointment",
                time: "12 hours ago",
              },
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
              >
                <img src={item.icon} className="w-6 h-6" alt="Icon" />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium truncate w-48">
                    {item.text}
                  </p>
                  <span className="text-gray-500 text-xs">{item.time}</span>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-4">
            Activities
          </h2>
          <ul className="text-sm space-y-3">
            {[
              {
                icon: "/pr2.svg",
                text: "You have an appointment",
                time: "Just now",
              },
              {
                icon: "/pr3.svg",
                text: "Bro got his appointment delayed",
                time: "59 minutes ago",
              },
              {
                icon: "/pr4.svg",
                text: "You have 4 profiles to review",
                time: "12 hours ago",
              },
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
              >
                <img src={item.icon} className="w-6 h-6" alt="Icon" />
                <div>
                  <p className="text-gray-800 font-medium">{item.text}</p>
                  <span className="text-gray-500 text-xs">{item.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </ProtectedRoute>
  );
}
