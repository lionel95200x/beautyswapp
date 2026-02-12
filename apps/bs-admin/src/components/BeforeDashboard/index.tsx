import { Banner } from '@payloadcms/ui'
import React from 'react'

import './index.scss'

const baseClass = 'before-dashboard'

export const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Bienvenue sur BeautySwapp Admin</h4>
      </Banner>
      <p>Tableau de bord de gestion de la marketplace BeautySwapp</p>
      <ul className={`${baseClass}__instructions`}>
        <li>
          <strong>Produits soumis :</strong>
          {' Vérifiez les nouveaux produits déposés par les vendeurs et créez les annonces correspondantes'}
        </li>
        <li>
          <strong>Validation vendeur :</strong>
          {' Gérez les annonces en attente de validation par les vendeurs'}
        </li>
        <li>
          <strong>Commandes :</strong>
          {' Suivez les commandes, générez les étiquettes d\'expédition et mettez à jour les statuts'}
        </li>
        <li>
          <strong>Paiements :</strong>
          {' Surveillez les paiements Stripe et gérez la libération des fonds après confirmation de réception'}
        </li>
        <li>
          <strong>Litiges :</strong>
          {' Traitez les signalements et problèmes remontés par les utilisateurs'}
        </li>
      </ul>
      <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
        {'Configuration Stripe : '}
        <a
          href="https://dashboard.stripe.com/test/apikeys"
          rel="noopener noreferrer"
          target="_blank"
        >
          Gérer les clés API
        </a>
      </p>
    </div>
  )
}
