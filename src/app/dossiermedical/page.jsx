"use client";

import { useState } from "react";
export default function Dossiermedical() {

    const [openSections, setOpenSections] = useState({});

    const toggleSection = (label) => {
      setOpenSections((prev) => ({
        ...prev,
        [label]: !prev[label],
      }));
    };
  return (
    <div className="flex h-full bg-gray-100">
      {/* Sidebar */}
      <aside className="w-65 bg-white shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-8">
        <img src="Logo.svg" className="w-10 h-10" alt="Logo" />
        <h1 className="font-bold text-xl text-gray-800">Doctor Esi</h1>
      </div>
      <nav>
        <h2 className="text-gray-500 text-sm font-light mb-2">Favorites</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="hover:text-black cursor-pointer flex items-center gap-2">
            <span className="text-gray-500 font-light text-xl">•</span> Overview
          </li>
          <li className="hover:text-black cursor-pointer flex items-center gap-2">
            <span className="text-gray-500 font-light text-xl">•</span> Schedule
          </li>
        </ul>

        <h2 className="text-gray-500 text-sm font-light mt-6 mb-2">Dashboards</h2>
        <ul className="space-y-3 text-gray-700">
          {['Default', 'Activities', 'Schedule', 'Something'].map((item, index) => (
            <li
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer relative ${
                item === 'Default' ? 'bg-[#E1E1E1] text-black' : 'hover:bg-gray-200'
              }`}
            >
              {item === 'Default' && (
                <div className="absolute left-0 top-3 h-[50%] w-1.5 bg-black rounded"></div>
              )}
              <img src={`${item}.svg`} className="w-5 h-5" alt={item} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-gray-500 text-sm font-light mt-6 mb-2">Pages</h2>
        <ul className="space-y-3 text-gray-700">
          {[
            { icon: 'Userp.svg', label: 'User Profile', subItems: ['Overview', 'Projects', 'Campaigns', 'Documents', 'Usage'] },
            { icon: 'Account.svg', label: 'Account' },
            { icon: 'Corporate.svg', label: 'Corporate' },
            { icon: 'Blog.svg', label: 'Blog' },
            { icon: 'Social.svg', label: 'Social' },
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
                    <img src="ArrowLineRight.svg" alt="" className="w-5 h-5 " />
                  </span>
                )}
                <img src={page.icon} className="w-5 h-5" alt={page.label} />
                <span>{page.label}</span>
              </div>
              {page.subItems && openSections[page.label] && (
                <ul className="pl-6 space-y-1 text-gray-500 text-sm">
                  {page.subItems.map((subItem, subIndex) => (
                    <li key={subIndex} className="hover:text-black cursor-pointer">{subItem}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>

      
      {/* Main Content */}
      <main className="flex-1 p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Patient Profile</h2>
          <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-10 py-1.5 rounded-lg transition">Edit</button>
        </div>
        <section className="mt-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">MILLIE MYERS</h3>
              <p className="text-gray-400 text-sm">DOCTORINA@ESI-SBA.DZ</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6">
            {[
              { label: 'Full Name', value: 'Meliani Tarek' },
              { label: 'Birth', value: '1999-04-11'},
              { label: 'Service',value: 'Jsp'},
              { label: 'Address', value: 'Canastel Oran' },
              { label: 'N du dossier', value: 'student'},
              { label: 'Blood type', value: 'O+'},
              { label: 'NIR', value: '4646546'},
              { label: 'Situation Familiale', value: 'Sample'},
              { label: 'Meds', value: 'Paracetamol'},
              { label: 'Autres', value: 'Jsp'},
              { label: 'Affections congenitals', value: 'HIV'},
              { label: 'Maladies general', value: 'Asthma'},
              { label: 'Alergies des meds', value: 'Water'},
              { label: 'Poids', value: '65kgs'},
              { label: 'Taille', value: '180cm'},
              
            ].map((field, index) => (
              <div key={index}>
                <label className="text-black text-sm font-medium">{field.label}</label>
                <input 
                  type="text" 
                  value={field.value} 
                  className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600" 
                  disabled 
                />
              </div>
            ))}
          </div>
          <div className="mt-6">
                  <label className="text-black text-sm font-medium">Medical History</label>
                  
                    <button className="bg-[#E85B5B] hover:bg-[#E85B5B] cursor-pointer text-white px-10 py-1.5 rounded-lg transition flex items-center gap-2 mt-2">View</button>

          </div>
          <div>
        <h3 className="mb-4 text-lg font-medium pt-6">Tabacs:</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" id="smoker" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
            <label htmlFor="smoker" className="ml-2 text-sm text-gray-700">
              a fumer
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="alcohol" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
            <label htmlFor="alcohol" className="ml-2 text-sm text-gray-700">
              a chiquer
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="prise" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
            <label htmlFor="prise" className="ml-2 text-sm text-gray-700">
              à prise
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="ancient-fumeur" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
            <label htmlFor="ancient-fumeur" className="ml-2 text-sm text-gray-700">
              Ancien fumeur
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="alcool" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
            <label htmlFor="alcool" className="ml-2 text-sm text-gray-700">
              Alcool
            </label>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-y-2 border-gray-300 py-2 text-center font-medium">Appareils</th>
              <th className="border-y-2 border-gray-300 py-2 text-center font-medium">Interrogatoire</th>
              <th className="border-y-2 border-gray-300 py-2 text-center font-medium">Examens Clinique</th>
            </tr>
          </thead>
          <tbody>
            <tr className="align-top border-b-2 border-gray-300">
              <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Peau et Muqueuses</h4>
                  </div>
                </div>
              </td>
              <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="affectation-cutanees"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <label htmlFor="affectation-cutanees" className="ml-2 text-sm text-gray-700">
                      Affectation cutanées
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="align-top border-b-2 border-gray-300">
              <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Ophtalmologique</h4>
                  </div>
                </div>
              </td>
              <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input type="checkbox" id="larmoiement" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                    <label htmlFor="larmoiement" className="ml-2 text-sm text-gray-700">
                      Larmoiement
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="douleurs" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                    <label htmlFor="douleurs" className="ml-2 text-sm text-gray-700">
                      Douleurs
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="taches" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                    <label htmlFor="taches" className="ml-2 text-sm text-gray-700">
                      Taches Devant Les Yeux
                    </label>
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
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <label htmlFor="sifflements" className="ml-2 text-sm text-gray-700">
                      Sifflements
                    </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="angine" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                      <label htmlFor="angine" className="ml-2 text-sm text-gray-700">
                        Angine répétées
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="epistaxis"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <label htmlFor="epistaxis" className="ml-2 text-sm text-gray-700">
                        Epistaxis
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rhinorrhée"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <label htmlFor="rhinorrhée" className="ml-2 text-sm text-gray-700">
                        Rhinorrhée
                      </label>
                    </div>
                    <div className="mt-2 flex items-center">
                      <label className="block text-sm font-medium text-gray-700">Autre:</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>  
                </div>
              </td>
            </tr>
            <tr className="align-top border-b-2 border-gray-300">
              <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                <div className="space-y-4">
                  <div className="mt-6">
                    <h4 className="mb-2 text-sm font-medium">Locomoteur</h4>
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
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <label htmlFor="musculaires" className="ml-2 text-sm text-gray-700">
                        Musculaires
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="articulaires"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <label htmlFor="articulaires" className="ml-2 text-sm text-gray-700">
                        Articulaires
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="vertebrales"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <label htmlFor="vertebrales" className="ml-2 text-sm text-gray-700">
                        Vertébrales
                      </label>
                    </div>
                </div>
              </td>
            </tr>
            <tr className="align-top border-b-2 border-gray-300">
              <td className="border-r-2 pr-4 pt-4 w-1/3 border-gray-300">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Cardio - Vasculaire</h4>
                  </div>
                </div>
              </td>
              <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="palpitation"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <label htmlFor="palpitation" className="ml-2 text-sm text-gray-700">
                        Palpitation
                      </label>
                    </div>
                    <h4 className="mb-2 text-sm font-medium">Douleurs :</h4>
                    <div className="flex items-center">
                      <input type="checkbox" id="oedemes" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                      <label htmlFor="oedemes" className="ml-2 text-sm text-gray-700">
                        Oedèmes
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="a-la-marche"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <label htmlFor="a-la-marche" className="ml-2 text-sm text-gray-700">
                        À la marche
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="au-repos" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                      <label htmlFor="au-repos" className="ml-2 text-sm text-gray-700">
                        Au repos
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="a-effort" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                      <label htmlFor="a-effort" className="ml-2 text-sm text-gray-700">
                        À l'effort
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="permanents"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <label htmlFor="permanents" className="ml-2 text-sm text-gray-700">
                        Permanents
                      </label>
                    </div>
                </div>
              </td>
              <td className="p-4 pt-4 w-1/3">
                <div className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-700">Pouls :</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">T.A :</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cyanose :</label>
                      <input
                        type="text"
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
                    <h4 className="mb-2 text-sm font-medium">Respiratoire</h4>
                  </div>
                </div>
              </td>
              <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                <div className="space-y-4">
                <div className="flex items-center">
                      <input type="checkbox" id="toux" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                      <label htmlFor="toux" className="ml-2 text-sm text-gray-700">
                        Toux
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="dyspnee-nocturne"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <label htmlFor="dyspnee-nocturne" className="ml-2 text-sm text-gray-700">
                        Dyspnée Nocturne
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="dyspnee-diurne"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <label htmlFor="dyspnee-diurne" className="ml-2 text-sm text-gray-700">
                        Dyspnée Diurne
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="expectorations"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <label htmlFor="expectorations" className="ml-2 text-sm text-gray-700">
                        Expectorations
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="douleurs-thoraciques"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <label htmlFor="douleurs-thoraciques" className="ml-2 text-sm text-gray-700">
                        Douleurs thoraciques
                      </label>
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700">Autre :</label>
                      <input
                        type="text"
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
                    <h4 className="mb-2 text-sm font-medium">Digestif</h4>
                  </div>
                </div>
              </td>
              <td className="border-r-2 border-gray-300 p-4 pt-4 w-1/3">
                <div className="space-y-4">
                <div className="flex items-center">
                      <input type="checkbox" id="pyrosis" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                      <label htmlFor="pyrosis" className="ml-2 text-sm text-gray-700">
                        Pyrosis
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="vomissements"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <label htmlFor="vomissements" className="ml-2 text-sm text-gray-700">
                        Vomissements
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="appetit" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                      <label htmlFor="appetit" className="ml-2 text-sm text-gray-700">
                        Appétit
                      </label>
                      <input type="text" className="ml-2 w-20 rounded-md border border-gray-300 px-2 py-1 text-sm" />
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="transit" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                      <label htmlFor="transit" className="ml-2 text-sm text-gray-700">
                        Transit
                      </label>
                      <input type="text" className="ml-2 w-20 rounded-md border border-gray-300 px-2 py-1 text-sm" />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rectalgies"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <label htmlFor="rectalgies" className="ml-2 text-sm text-gray-700">
                        Rectalgies
                      </label>
                      <input type="text" className="ml-2 w-20 rounded-md border border-gray-300 px-2 py-1 text-sm" />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="douleur-abdominale"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <label htmlFor="douleur-abdominale" className="ml-2 text-sm text-gray-700">
                        Douleur abdominale
                      </label>
                      <input type="text" className="ml-2 w-20 rounded-md border border-gray-300 px-2 py-1 text-sm" />
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="autres" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                      <label htmlFor="autres" className="ml-2 text-sm text-gray-700">
                        Autres
                      </label>
                      <input type="text" className="ml-2 w-20 rounded-md border border-gray-300 px-2 py-1 text-sm" />
                    </div>
                </div>
              </td>
              <td className=" p-4 pt-4 w-1/3">
                <div className="space-y-4">
                <div>
                      <label className="block text-sm font-medium text-gray-700">Denture :</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gingivorragie :</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Autres :</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Abdomen :</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Hernie :</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Foie :</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        </section>
      </main>
      
      {/* Right Panel */}
      <aside className="w-80 bg-white p-6 shadow-xl rounded-2xl">
  {/* Notifications Section */}
  <h2 className="text-lg font-semibold text-gray-800 mb-4"> Notifications</h2>
  <ul className="text-[13px] space-y-3">
  {[
    { icon: "problem.svg", text: "You have a student who submitted a long report about something important", time: "Just now" },
    { icon: "newprof.svg", text: "Akram needs his medical history", time: "59 minutes ago" },
    { icon: "alarm.svg", text: "Tarek missed his appointment", time: "12 hours ago" }
  ].map((item, index) => (
    <li 
      key={index} 
      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
    >
      <img src={item.icon} className="w-6 h-6" alt="Icon" />
      <div className="flex-1 min-w-0">
        <p className="text-gray-800 font-medium truncate w-48">{item.text}</p>
        <span className="text-gray-500 text-xs">{item.time}</span>
      </div>
    </li>
  ))}
</ul>

  {/* Activities Section */}
  <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-4"> Activities</h2>
  <ul className="text-sm space-y-3">
    {[
      { icon: "pr2.svg", text: "You have an appointment", time: "Just now" },
      { icon: "pr3.svg", text: "Bro got his appointment delayed", time: "59 minutes ago" },
      { icon: "pr4.svg", text: "You have 4 profiles to review", time: "12 hours ago" }
    ].map((item, index) => (
      <li key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition">
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
  );
}
