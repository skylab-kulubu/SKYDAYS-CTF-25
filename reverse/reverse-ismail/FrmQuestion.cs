using System;
using System.Security.Cryptography;
using System.Text;
using System.Windows.Forms;

namespace ReverseEngineeringCtf
{
    public partial class FrmQuestion : Form
    {
        private readonly string TrueAnswer = "72";
        private readonly string FlagAnswer = "apWM2-D0VMA2j92K-!*3M8U3N0Fjsg3830ga8 2ujMFT4H3*-";
        private readonly string Flag = "1zqhZ3B5Q17ZBhZSMMUHV0rWW4ajJ7sRinbPq0HwwEo9Ns0aA3TxoffvRtUUOa1jwdQBLx//vKAnVmRbC7dbBziv6TorLf9zZWGR8A4NWs4=";
        private static readonly int KeySize = 256;
        private static readonly int BlockSize = 128;
        private static readonly int SaltSize = 16;
        private static readonly int IvSize = 16;
        private static readonly int Iterations = 100000;
        private static readonly string Passphrase = "StrongPassphrase123!";

        public FrmQuestion()
        {
            InitializeComponent();
        }

        private void btnAnswer_Click(object sender, EventArgs e)
        {
            string answer = txtAnswer.Text;
            if (answer == null || answer.Length == 0)
            {
                MessageBox.Show("Yanlış cevap");
            }
            else if (answer.Equals(TrueAnswer))
            {
                MessageBox.Show("       Doğru cevap\n\n           〈( ^.^)ノ\r\n");
                MessageBox.Show(" Fakat flag cevabı bu değildi");
                MessageBox.Show(" Yanlış yönlendirmeden dolayı pek de pişman değiliz :)");
                MessageBox.Show(" İpucu verelim bari");
                MessageBox.Show(" DnSpy kullanarak tersine mühendislik yap");
                txtAnswer.Text = "";
            }
            else if (answer.Equals(FlagAnswer))
            {
                CopyableMessageBox.Show(Decrypt(Flag), "Flag");
                CopyableMessageBox.Show("https://youtu.be/51r7p4AYa_k?list=PLUYa52_9xFS_YrSM1TGvfLZoCtZIXynT-&t=889", "Çözüm");
                txtAnswer.Text = "";
            }
            else
            {
                MessageBox.Show("Yanlış cevap");
            }
        }


        public static string Decrypt(string encryptedText)
        {
            byte[] combinedData = Convert.FromBase64String(encryptedText);
            byte[] salt = new byte[SaltSize];
            byte[] iv = new byte[IvSize];
            byte[] cipherBytes = new byte[combinedData.Length - SaltSize - IvSize];

            Buffer.BlockCopy(combinedData, 0, salt, 0, SaltSize);
            Buffer.BlockCopy(combinedData, SaltSize, iv, 0, IvSize);
            Buffer.BlockCopy(combinedData, SaltSize + IvSize, cipherBytes, 0, cipherBytes.Length);

            using (var aes = new AesCryptoServiceProvider())
            {
                aes.KeySize = KeySize;
                aes.BlockSize = BlockSize;
                aes.Mode = CipherMode.CBC;
                aes.Padding = PaddingMode.PKCS7;

                using (var keyDerivation = new Rfc2898DeriveBytes(Passphrase, salt, Iterations, HashAlgorithmName.SHA256))
                {
                    aes.Key = keyDerivation.GetBytes(KeySize / 8);
                    aes.IV = iv;
                }

                using (var decryptor = aes.CreateDecryptor())
                {
                    byte[] plainBytes = decryptor.TransformFinalBlock(cipherBytes, 0, cipherBytes.Length);
                    return Encoding.UTF8.GetString(plainBytes);
                }
            }
        }
    }

    public static class CopyableMessageBox
    {
        public static void Show(string message, string title)
        {
            Form form = new Form()
            {
                Width = 400,
                Height = 200,
                Text = title,
                StartPosition = FormStartPosition.CenterScreen
            };

            TextBox textBox = new TextBox()
            {
                Text = message,
                Multiline = true,
                Dock = DockStyle.Fill,
                ReadOnly = true,
                ScrollBars = ScrollBars.Vertical
            };

            Button okButton = new Button()
            {
                Text = "Tamam",
                Dock = DockStyle.Bottom,
                DialogResult = DialogResult.OK
            };

            form.Controls.Add(textBox);
            form.Controls.Add(okButton);
            form.AcceptButton = okButton;

            form.ShowDialog();
        }
    }
}
