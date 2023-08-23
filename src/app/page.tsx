import styles from './page.module.css'
import Register from '@/components/register'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Bem vindo! Faça seu cadastro
      </h1>
      <Register />
    </main>
  )
}
